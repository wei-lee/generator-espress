#!/bin/bash
#
# Special helper script to be used in conjunction with /etc/init.d/<%= projectName %>
# to ensure log output (sent to stdout,stderr) from a daemonized script is accessible.
#
umask 002
exec /usr/local/bin/<%= projectName %> $* > /var/log/feedhenry/<%= projectName %>/<%= projectName %>-console.log 2>&1
