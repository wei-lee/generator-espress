#!/bin/sh
if [ "$(id -u)" != "0" ]; then
 echo "NOT running post-install script since not ROOT user"
 exit
fi

OSNAME=`uname -s`
case $OSNAME in
 Linux)
   echo Installing startup script to /etc/init.d/<%= projectName %>
   cp scripts/<%= projectName %> /etc/init.d
   echo Initialising - update-rc.d <%= projectName %> defaults 80
   update-rc.d <%= projectName %> defaults 80
   ;;
 *)
   echo no post-installation for OS $OSNAME
   ;;
esac
