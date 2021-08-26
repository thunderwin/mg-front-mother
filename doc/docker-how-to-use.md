## https://help.aliyun.com/document_detail/51853.html

## https://help.aliyun.com/document_detail/50704.html?spm=5176.11065259.1996646101.searchclickresult.3da96a04DD3i2G

sudo curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

我的镜像文档

https://docs.stacknil.com/images/application/magento/

php bin/magento setup:config:set --cache-backend=redis --cache-backend-redis-server=127.0.0.1
--cache-backend-redis-port=6379 --cache-backend-redis-db=0
