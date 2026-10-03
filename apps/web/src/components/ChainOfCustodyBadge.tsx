import React, { useState } from "react";
import { Check, Copy, ExternalLink, ShieldCheck, Database, Lock } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";

interface Props {
  sha256: string;
  ipfsCid?: string;
  gatewayUrl?: string;
  officerBadge?: string;
  timestamp?: string;
  fileSize?: number;
  verified?: boolean;
}

export default function ChainOfCustodyBadge({
  sha256,
  ipfsCid = "bafybeicciqduqsz6pecwgtpsfyl2texlw2xcqzf2v64e72wl5uw",
  gatewayUrl,
  officerBadge = "CID-DEL-8941",
  timestamp,
  fileSize,
  verified = true,
}: Props) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCid, setCopiedCid] = useState(false);

  const ipfsLink = gatewayUrl || `https://gateway.pinata.cloud/ipfs/${ipfsCid}`;

  const copyToClipboard = (text: string, type: "hash" | "cid") => {
    navigator.clipboard.writeText(text);
    if (type === "hash") {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else {
      setCopiedCid(true);
      setTimeout(() => setCopiedCid(false), 2000);
    }
  };

  return (
    <div className="bg-[#141413] border border-[#262624] rounded-xl p-4 shadow-xl space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#262624] pb-2">
        <div className="flex items-center gap-1.5 text-[#F5F5F5] font-bold tracking-wide uppercase text-[11px]">
          <ShieldCheck className="w-4 h-4 text-[#D9D7B6]" />
          <ShinyText
            text="BNSS 2023 Sec 63 • Cryptographic Seal"
            color="#D9D7B6"
            shineColor="#FDFBD4"
            speed={3}
          />
        </div>
        <span className="text-[10px] bg-[#545333]/40 text-[#FDFBD4] border border-[#878672]/60 px-2 py-0.5 rounded font-bold font-mono">
          SEALED AT INGESTION
        </span>
      </div>

      {/* SHA-256 Hash Row */}
      <div>
        <div className="text-[10px] text-[#BCBAB4] uppercase flex items-center justify-between mb-1">
          <span>Primary Integrity Hash (SHA-256):</span>
          <button
            onClick={() => copyToClipboard(sha256, "hash")}
            className="text-[10px] text-[#D9D9D9] hover:text-white flex items-center gap-1 transition"
          >
            {copiedHash ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" /> <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> <span>Copy Hash</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-[#111110] p-2.5 rounded-lg border border-[#262624] text-[#D9D9D9] break-all select-all text-[11px]">
          <DecryptedText
            text={sha256}
            animateOn="view"
            speed={30}
            className="text-emerald-400 font-mono"
            encryptedClassName="text-emerald-800/80 font-mono"
          />
        </div>
      </div>

      {/* IPFS CID Row */}
      <div>
        <div className="text-[10px] text-[#BCBAB4] uppercase flex items-center justify-between mb-1">
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3 text-[#BCBAB4]" />
            <span>Pinata IPFS Vault CID:</span>
          </span>
          <a
            href={ipfsLink}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] text-[#F5F5F5] hover:text-[#D9D9D9] flex items-center gap-1 transition underline underline-offset-2"
          >
            <span>Inspect Gateway</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="bg-[#111110] p-2.5 rounded-lg border border-[#262624] text-[#BCBAB4] break-all select-all text-[11px] flex justify-between items-center">
          <DecryptedText
            text={ipfsCid}
            animateOn="view"
            speed={35}
            className="text-cyan-300 font-mono"
            encryptedClassName="text-cyan-800/80 font-mono"
          />
          <button
            onClick={() => copyToClipboard(ipfsCid, "cid")}
            className="ml-2 text-[#6B6762] hover:text-white"
            title="Copy CID"
          >
            {copiedCid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Officer & Timestamp Footnote */}
      <div className="flex justify-between items-center pt-1 text-[10px] text-[#6B6762]">
        <span>Certifying Badge: <strong className="text-[#BCBAB4]">{officerBadge}</strong></span>
        <span>{timestamp || new Date().toISOString().substring(0, 19) + "Z"}</span>
      </div>
    </div>
  );
}
