import type { DnsConfig } from '@stacksjs/types'

/**
 * **DNS Options**
 *
 * Declarative DNS for chrisbreuer.me. NOTE: the authoritative DNS for this
 * domain lives at PORKBUN (not Route 53), pointing at the shared Hetzner box
 * (stacks-production-app, 178.156.x — see config/cloud.ts attachTo). This file
 * documents the desired records; `buddy dns` reconciliation against Route 53
 * is a no-op for this project (no AWS credentials / hosted zone).
 */
export default {
  a: [
    {
      name: 'chrisbreuer.me', // Hostname (root domain)
      address: '178.105.248.188', // shared Hetzner box (stacks-production-app)
      ttl: 300, // Time-to-live in seconds
    },

    {
      name: 'www',
      address: '@',
      ttl: 300,
    },
  ],
  aaaa: [],
  cname: [],
  mx: [],
  txt: [],

  nameservers: ['curitiba.ns.porkbun.com', 'fortaleza.ns.porkbun.com', 'maceio.ns.porkbun.com', 'salvador.ns.porkbun.com'],
} satisfies DnsConfig
