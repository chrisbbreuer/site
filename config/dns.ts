import type { DnsConfig } from '@stacksjs/types'

/**
 * **DNS Options**
 *
 * Declarative DNS for chrisbreuer.me. The zone is on Cloudflare (registered at
 * Porkbun) and is owned by deploy through config/cloud.ts infrastructure.dns,
 * so nothing is declared here.
 */
export default {
  // Deliberately empty. The zone is on Cloudflare and deploy owns it (see
  // config/cloud.ts infrastructure.dns): it copied Porkbun's records across
  // when it moved the zone and reconciles them since. Declaring records here
  // as well would give the domain two owners that disagree. Add entries only
  // for records deploy does not manage, such as a verification TXT.
  a: [],
  aaaa: [],
  cname: [],
  mx: [],
  txt: [],

  nameservers: [],
} satisfies DnsConfig
