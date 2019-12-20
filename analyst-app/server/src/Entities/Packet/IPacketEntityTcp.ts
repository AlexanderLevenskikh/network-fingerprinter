export interface IPacketEntityTcp {
    tcp_tcp_srcport: string;
    tcp_tcp_dstport: string;
    tcp_tcp_port: string[];
    tcp_tcp_stream: string;
    tcp_tcp_len: string;
    tcp_tcp_seq: string;
    tcp_tcp_nxtseq: string;
    tcp_tcp_ack: string;
    tcp_tcp_hdr_len: string;
    tcp_tcp_flags: string;
    tcp_flags_tcp_flags_res: string;
    tcp_flags_tcp_flags_ns: string;
    tcp_flags_tcp_flags_cwr: string;
    tcp_flags_tcp_flags_ecn: string;
    tcp_flags_tcp_flags_urg: string;
    tcp_flags_tcp_flags_ack: string;
    tcp_flags_tcp_flags_push: string;
    tcp_flags_tcp_flags_reset: string;
    tcp_flags_tcp_flags_syn: string;
    tcp_flags_tcp_flags_fin: string;
    tcp_flags_tcp_flags_str: string;
    tcp_tcp_window_size_value: string;
    tcp_tcp_window_size: string;
    tcp_tcp_window_size_scalefactor: string;
    tcp_tcp_checksum: string;
    tcp_tcp_checksum_status: string;
    tcp_tcp_urgent_pointer: string;
    tcp_tcp_options?: string;
    tcp_options_tcp_options_mss?: string;
    tcp_options_mss_tcp_option_kind?: string;
    tcp_options_mss_tcp_option_len?: string;
    tcp_options_mss_tcp_options_mss_val?: string;
    tcp_options_tcp_options_wscale?: string;
    tcp_options_wscale_tcp_option_kind?: string;
    tcp_options_wscale_tcp_option_len?: string;
    tcp_options_wscale_tcp_options_wscale_shift?: string;
    tcp_options_wscale_tcp_options_wscale_multiplier?: string;
    tcp_options_tcp_options_sack_perm?: string;
    tcp_options_sack_perm_tcp_option_kind?: string;
    tcp_options_sack_perm_tcp_option_len?: string;

    tcp_tcp_analysis?: any;
    tcp_analysis_tcp_analysis_bytes_in_flight: string;
    tcp_analysis_tcp_analysis_push_bytes_sent: string;
    tcp_text: string;
    text_tcp_time_relative: string;
    text_tcp_time_delta: string;
    tcp_tcp_payload: string;
}
