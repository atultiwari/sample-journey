# Sample Journey

An interactive teaching figure of the journey of one laboratory sample at Shalby Multi-Specialty Hospitals, SG Highway,
Ahmedabad: from the doctor's order to the patient's report. 22 stations in 9 steps, for lab staff, nursing staff and students.

**Open it:** https://atultiwari.github.io/sample-journey/

## What it shows

- A hand-drawn sketch of each place: the doctor's room and registration on the ground floor, sample collection in the
  basement, the laboratory on the 9th floor.
- Who does what at each station, what the software records, what can go wrong, and the source for each.
- A cards panel for problems, such as haemolysis, a spill, QC failure or an unreachable doctor.
- A player like an old cassette player: First, Previous, Play, Pause, Stop, Next, Last.

## Patient data

The patient on these pages is made up: Mr Demo Patient, PID SHLDEMO00001, Lab ID DEMO00001. Every screen is marked
"TEACHING SAMPLE: NOT A REAL REPORT". It is a teaching figure, not a procedure of the hospital and not clinical advice.

## Sources

The full list, with clause numbers, is in [docs/spec.md](docs/spec.md) and on the page under Sources.

- ISO 15189:2022(E), Fourth edition
- NABL 112A, Issue 01, 18-Dec-2024
- NABL 112B, Issue 01, 18-Dec-2024, Amendment 01, 04-Nov-2025
- NABH Accreditation Standards for Hospitals, 6th Edition, effective 1 Jan 2025
- Digital Personal Data Protection Act, 2023, and Rules, 2025 (not legal advice)
- Separate from NABL and NABH: CLSI order of draw (2019 article; PRE02 text not read) and BD Vacutainer Tech Talk VS9016 (05/11)
- Marked unverified on the page: Bio-Medical Waste Management Rules, 2016, Schedule I bin colours

These documents are cited, not included. Where a standard sets no number, the page says "per the lab's documented policy".

## Run it locally

No build and no install. Serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/. Add `?autoplay=0` to start still, or `?at=draw&u=.7` to open at a station.

Tests need Node 22 or later:

```bash
node --test tests/spec-data.test.mjs
```

## Credits

Made with ♥ and a passion for teaching pathology · [Dr. Atul Tiwari](https://atultiwari.com/)

Code is under the [MIT licence](LICENSE). The licence does not cover the Shalby name or the depiction of its building,
which are used with permission. Engine notices are in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md). Illustrations were
generated with GPT Image 2.5 through Higgsfield, and each is logged in [assets/generated/README.md](assets/generated/README.md).
