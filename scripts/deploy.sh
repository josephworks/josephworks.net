#!/usr/bin/env bash
if [ "$EUID" -ne 0 ]
  then
  echo "====================="
  echo -e "\e[31mPlease run as root!\e[0m"
  echo "====================="
  exit
fi
cp -r /var/www /var/www_bak
cp ./* /var/www/html