const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const shell = require('shelljs');

module.exports = (questions, dataStream) => (socket) => {
  socket.emit('PROFESSOR_CODE_EDITED', dataStream[dataStream.length - 1] || { text: '//no code' });

  socket.on('PROFESSOR_CODE_EDITED', (d) => {
    dataStream.push(d);
    socket.broadcast.emit('PROFESSOR_CODE_EDITED', d);
  });

  socket.on('REQUEST_LATEST_CHANGE', () => {
    socket.emit('RECIEVE_LATEST_CHANGE', dataStream[dataStream.length - 1] || { test: '//no code' });
  });

    // Code execution endpoints
  socket.on('EXECUTE_CODE', ({ id, code, language }) => {
    console.log('Received code');
    console.log(code);

    const directory = 'build';
    const filesToDelete = [];
      // Create build dir., if necessary
    mkdirp(directory, (mkdirErr) => {
      if (mkdirErr) {
        socket.broadcast.emit('CODE_EXECUTED_' + id, {
          code: 1,
          err: {
            desc: 'Unable to create server build directory.',
            error: mkdirErr,
          },
        });
      }
      if (language === 'java') {
        const filename = 'Test';
          // const filename = `build/${'test.'}${fileEnding}`;
        const javaFile = path.join(directory, `${filename}.java`);
        const javaClassFile = path.join(directory, `${filename}.class`);
        // Write user's code to tmp file in build directory
        fs.writeFile(javaFile, code, (writeFileErr) => {
          if (writeFileErr) {
            socket.broadcast.emit('CODE_EXECUTED_' + id, {
              code: 1,
              err: {
                desc: 'Unable to write code to build directory file.',
                error: writeFileErr,
              },
            });
          } else {
            filesToDelete.push(javaFile);
              // Compile the user code (javac javaFile)
            shell.exec(`javac ${javaFile}`, (compileExitCode, compileStdout, compileStderr) => {
              if (compileExitCode !== 0) {
                console.log(compileExitCode);
                shell.rm(filesToDelete);
                socket.broadcast.emit('CODE_EXECUTED_' + id, {
                  code: compileExitCode,
                  err: {
                    desc: 'Compilation failed.',
                    error: compileStderr,
                  },
                });
              } else {
                filesToDelete.push(javaClassFile);
                  // Run the user code (java javacFile)
                shell.exec(`cd ${directory} && java ${filename}`, (runExitCode, runStdout, runStderr) => {
                  if (runExitCode !== 0) {
                    shell.rm(filesToDelete);
                    socket.broadcast.emit('CODE_EXECUTED_' + id, {
                      code: runExitCode,
                      err: {
                        desc: 'Execution failed.',
                        error: runStderr,
                      },
                    });
                  } else {
                    shell.rm(filesToDelete);
                    socket.broadcast.emit('CODE_EXECUTED_' + id, { output: runStdout });
                  }
                });
              }
            });
          }
        });
      } else if (language === 'c') {
        const filename = 'test';
        const cFile = path.join(directory, `${filename}.c`);
        const outFile = path.join(directory, 'a.out');
        // Write user's code to tmp file in build directory
        fs.writeFile(cFile, code, (writeFileErr) => {
          if (writeFileErr) {
            socket.emit('CODE_EXECUTED', {
              code: 1,
              err: {
                desc: 'Unable to write code to build directory file.',
                error: writeFileErr,
              },
            });
          } else {
            filesToDelete.push(cFile);
              // Compile the user code (gcc cFile)
            shell.exec(`cd ${directory} && gcc ${filename}.c`, (compileExitCode, compileStdout, compileStderr) => {
              if (compileExitCode !== 0) {
                shell.rm(filesToDelete);
                socket.emit('CODE_EXECUTED', {
                  code: compileExitCode,
                  err: {
                    desc: 'Compilation failed.',
                    code: compileExitCode,
                    error: compileStderr,
                  },
                });
              } else {
                filesToDelete.push(outFile);
                  // Run the user code (java javacFile)
                shell.exec(`cd ${directory} && ./a.out`, (runExitCode, runStdout, runStderr) => {
                  if (runExitCode !== 0) {
                    shell.rm(filesToDelete);
                    socket.emit('CODE_EXECUTED', {
                      code: runExitCode,
                      err: {
                        desc: 'Execution failed.',
                        error: runStderr,
                      },
                    });
                  } else {
                    shell.rm(filesToDelete);
                    socket.emit('CODE_EXECUTED', { code: 0, output: runStdout });
                  }
                });
              }
            });
          }
        });
      } else {
        socket.emit('CODE_EXECUTED', {
          err: {
            desc: 'Invalid compilation language.',
          },
        });
      }
    });
  });

  socket.on('mobile attached', () => {
    socket.broadcast.emit('mobile attached');
  });

  socket.on('mobile attached', () => {
    socket.broadcast.emit('mobile detached');
  });

  socket.on('qa fetchall', () => {
    const vals = [];
    console.log(Object.keys(questions).length);
    Object.keys(questions).forEach((key) => {
      vals.push(questions[key]);
    });
    socket.emit('qa fetchall resp', vals);
  });

  socket.on('qa add', (question) => {
    const q = {
      id: Math.random().toString(36).substring(7),
      body: question,
      points: 0,
    };
    questions[q.id] = q;
    socket.emit('qa add resp', q);
    socket.broadcast.emit('qa add resp', q);
  });

  socket.on('qa upvote', (qid) => {
    questions[qid].points++;
    socket.emit('qa upvote resp', qid);
    socket.broadcast.emit('qa upvote resp', qid);
  });

  socket.on('qa delete', (qid) => {
    delete questions[qid];
    socket.emit('qa delete resp', qid);
    socket.broadcast.emit('qa delete resp', qid);
  });
};
