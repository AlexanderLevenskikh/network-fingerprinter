export interface IPacketEntityIp {
    ip_ip_version: string;
    ip_ip_hdr_len: string;
    ip_ip_dsfield: string;
    ip_dsfield_ip_dsfield_dscp: string;
    ip_dsfield_ip_dsfield_ecn: string;
    ip_ip_len: string;
    ip_ip_id: string;
    ip_ip_flags: string;
    ip_flags_ip_flags_rb: string;
    ip_flags_ip_flags_df: string;
    ip_flags_ip_flags_mf: string;
    ip_flags_ip_frag_offset: string;
    ip_ip_ttl: string;
    ip_ip_proto: string;
    ip_ip_checksum: string;
    ip_ip_checksum_status: string;
    ip_ip_src: string;
    ip_ip_addr: string[];
    ip_ip_src_host: string;
    ip_ip_host: string[];
    ip_ip_dst: string;
    ip_ip_dst_host: string;
}
