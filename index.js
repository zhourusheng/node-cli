#! /usr/bin/env node
const program = require('commander')
const shell = require('shelljs')
const download = require('git-clone')
const { spawn } = require('child_process')
const open = require('open')

// 定义版本
program.version('1.0.0')

// 定义命令
program
  .command('new <name>')
  .description('创建项目')
  .action(name => {
    const gitUrl = 'https://github.com/vuejs/vue-next-webpack-preview.git'
    download(gitUrl, `./${name}`, () => {
      // 删除 .git 隐藏文件
      shell.rm('-rf', `${name}/.git`)
      shell.cd(name)
      shell.exec('npm install')
      // 成功后的提示
      console.log(`
                创建项目：${name} 成功
                cd ${name} 进入项目
                mycli run  启动项目
                mycli start 预览项目
            `)
    })
  })

program
  .command('run')
  .description('运行项目')
  .action(() => {
    // 使用 shell 完成
    // shell.exec('npm run dev')

    // 使用 child_process 完成
    const cp = spawn('npm', ['run', 'dev'])
    // 输出流和错误流
    cp.stdout.pipe(process.stdout)
    cp.stderr.pipe(process.stderr)
    cp.on('close', () => {
      console.log('启动项目成功')
    })
  })

program
  .command('start')
  .description('预览项目')
  .action(() => {
    open('http://localhost:8080/ ')
  })

// 解析命令行参数
program.parse(process.argv)
