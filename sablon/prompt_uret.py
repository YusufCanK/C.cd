#!/usr/bin/env python3
"""Bölümün sahneler.json dosyasından tam görsel prompt'ları üretir.
Kullanım: python3 sablon/prompt_uret.py story/bolum-01
Kilitli stil (karakterler/stil.md) ve karakter blokları (karakterler/<ad>.md) birebir eklenir."""
import json, re, sys, pathlib
kok = pathlib.Path(__file__).resolve().parent.parent
def blok(dosya):
    m = re.search(r"```\n(.*?)\n```", (kok/"karakterler"/dosya).read_text(), re.S)
    return m.group(1).strip()
stil = blok("stil.md")
bolum = pathlib.Path(sys.argv[1])
veri = json.loads((bolum/"sahneler.json").read_text())
cikti = []
for s in veri["sahneler"]:
    parcalar = [s["gorsel"]] + [blok(f"{k}.md") for k in s["karakterler"]] + [stil, "Vertical 9:16 composition."]
    cikti.append({"id": s["id"], "prompt": " ".join(parcalar)})
(bolum/"gorsel-promptlari.json").write_text(json.dumps(cikti, ensure_ascii=False, indent=2))
print(f"{len(cikti)} prompt yazıldı: {bolum/'gorsel-promptlari.json'}")
