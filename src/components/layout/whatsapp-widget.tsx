"use client";

import { X } from "lucide-react";
import { useState } from "react";
import type { SVGProps } from "react";
import { siteConfig } from "@/lib/content/site";

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.037 12.045.037 5.463.037.104 5.396.101 11.979c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.94 11.94 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.9 11.9 0 00-3.49-8.404" />
    </svg>
  );
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const waLink = `https://wa.me/${siteConfig.whatsapp.number}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[280px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
          <div className="bg-brand-green px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <WhatsAppIcon className="size-6 shrink-0" />
              <h3 className="text-sm font-semibold">WhatsApp</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/90">General enquiries only.</p>
          </div>
          <div className="p-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                <WhatsAppIcon className="size-6" />
              </span>
              <span>
                <span className="block font-semibold text-neutral-800">SpherEarth Capital</span>
                <span className="block text-xs text-neutral-500">General enquiries only</span>
              </span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        aria-expanded={open}
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <WhatsAppIcon className="size-7" />}
      </button>
    </div>
  );
}
