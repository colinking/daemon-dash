const dataStream = [];
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const shell = require('shelljs');

module.exports = (socket) => {
  socket.emit('PROFESSOR_CODE_EDITED', dataStream[dataStream.length - 1] || { text: '//no code' });
  socket.on('PROFESSOR_CODE_EDITED', (d) => {
    dataStream.push(d);
    socket.broadcast.emit('PROFESSOR_CODE_EDITED', d);
  });

  socket.on("REQUEST_LATEST_CHANGE", () => {
    socket.emit("RECIEVE_LATEST_CHANGE", dataStream[dataStream.length - 1] || {test: "//no code"});
  });

  // Code execution endpoints
  socket.on('EXECUTE_CODE', ({ code }) => {
    console.log('Received code');
    console.log(code);

    const directory = 'build';
    const filename = 'Test';
    // const filename = `build/${'test.'}${fileEnding}`;
    const javaFile = path.join(directory, `${filename}.java`);
    const javaClassFile = path.join(directory, `${filename}.class`);
    const filesToDelete = [];
    // Create build dir., if necessary
    mkdirp(directory, (mkdirErr) => {
      if (mkdirErr) {
        socket.emit('CODE_EXECUTED', {
          err: {
            desc: 'Unable to create server build directory.',
            error: mkdirErr,
          },
        });
      }
      // Write user's code to tmp file in build directory
      fs.writeFile(javaFile, code, (writeFileErr) => {
        if (writeFileErr) {
          socket.emit('CODE_EXECUTED', {
            err: {
              desc: 'Unable to write code to build directory file.',
              error: writeFileErr,
            },
          });
        } else {
          filesToDelete.push(javaFile);
          // TODO: Switch based on language
          // Compile the user code (javac javaFile)
          shell.exec(`javac ${javaFile}`, (compileExitCode, compileStdout, compileStderr) => {
            if (compileExitCode !== 0) {
              shell.rm(filesToDelete);
              socket.emit('CODE_EXECUTED', {
                err: {
                  desc: 'Compilation failed.',
                  code: compileExitCode,
                  error: compileStderr,
                },
              });
            } else {
              filesToDelete.push(javaClassFile);
              // Run the user code (java javacFile)
              shell.exec(`cd ${directory} && java ${filename}`, (runExitCode, runStdout, runStderr) => {
                if (runExitCode !== 0) {
                  shell.rm(filesToDelete);
                  socket.emit('CODE_EXECUTED', {
                    err: {
                      desc: 'Compilation failed.',
                      code: runExitCode,
                      error: runStderr,
                    },
                  });
                } else {
                  shell.rm(filesToDelete);
                  socket.emit('CODE_EXECUTED', { output: runStdout });
                }
              });
            }
          });
        }
      });
    });
  });

  socket.on('mobile attached', () => {
    console.log('mobile attached');
    socket.broadcast.emit('mobile attached');
  });
};
