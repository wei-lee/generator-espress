import {sysHealthEndpoint, sysPingEndpoint} from './sys';

export default function buildEndpoints(server) {
  sysHealthEndpoint(server);
  sysPingEndpoint(server);
};