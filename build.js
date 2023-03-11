/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const { join } = require('path')
const { exec } = require('child_process')

const dist = join(__dirname, 'dist')
const src = join(__dirname, 'src')

function copyFiles(files) {
  files.map((file) => {
    const distFile = join(dist, file)
    const srcFile = join(src, file)
    return fs.copy(srcFile, distFile)
  })
}

function build() {
  fs.removeSync(dist)
  fs.ensureDirSync(dist)

  const copyFileList = ['manifest.json', 'logo.png', 'popup/index.html']
  copyFiles(copyFileList)

  exec('pnpm rollup -c', (err, stdout) => {
    if (err) throw err
    console.log(stdout)
  })
}

build()
