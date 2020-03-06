#!/bin/sh
#==================非常重要==================
# 修改 serverList 时必须同时增加三个元素（一个ip，一个用户名，一个目录，以逗号隔开）,每组服务器以空格或者换行作为分隔符
# 如 serverList='
#   ip1,user1,dir1
#   ip2,user2,dir2
# '
#==================非常重要==================

# ==================你需要修改的=================
# 这个数组定义了开发时的部署的服务器列表（每次push自动触发部署操作）
serverList='
  10.10.108.157,work,/home/work/fe/react-antd-ts-rematch-template
'
# ==================你需要修改的=================


# ============如无必要，以下代码无需修改===============
# 部署一个服务器
function doDeploy {
  local ip=$1
  local user=$2
  local dir=$3
  ssh -o StrictHostKeyChecking=no ${user}@${ip} "mkdir -p ${dir}"
  tar -C ./dist -czf - ./ | ssh -o StrictHostKeyChecking=no ${user}@${ip} "tar -C ${dir} -xzf -"
}

echo "deploy server: ${serverList}"
# 部署一组服务器
for value in ${serverList}
do
  doDeploy ${value//,/ }
done
# ============如无必要，以上代码无需修改===============
