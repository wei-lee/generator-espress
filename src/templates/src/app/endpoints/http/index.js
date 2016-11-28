import fhlogger from 'fh-logger';
import fhconfig from 'fh-config';
import {sysHealthEndpoint, sysPingEndpoint} from './sys';

export default function buildEndpoints(server) {
  sysHealthEndpoint(server);
  sysPingEndpoint(server);
};