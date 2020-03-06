#!/bin/sh
# 请勿修改本文件
# 配置 ssh key 私钥
sshKeyBase64='xxxx'
mkdir /root/.ssh
chmod 700 /root/.ssh
echo ${sshKeyBase64} | base64 -d > /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa
cat /root/.ssh/id_rsa
