# Sample Journey: spec

**Status: DRAFT for Dr. Tiwari's approval. Nothing is built until this is approved.**

**Big idea:** Every handover of a sample leaves a name and a time. If that chain breaks, the result cannot be trusted, however good the machine is.

**What this is:** an interactive teaching figure and video, for internal teaching at Shalby Multi-Specialty Hospitals, SG Highway, Ahmedabad. It follows one sample from the doctor's order to the patient getting the report.

---

## 1. Sources and how to read the citations

| Short name | Exact document | Status |
|---|---|---|
| **ISO** | ISO 15189:2022(E), *Medical laboratories: Requirements for quality and competence*, Fourth edition, 2022-12 | Read in full for the clauses cited (your copy) |
| **112A** | NABL 112A, *Specific Criteria for Accreditation of Medical Laboratories*, Issue 01, 18-Dec-2024, no amendment on your copy | Read. Page = printed page "of 108". "§6h" = section 6, item h |
| **112B** | NABL 112B, *Guidance document: Medical Laboratories*, Issue 01, 18-Dec-2024, Amendment 01, 04-Nov-2025 | Read. Page = printed page "of 29" |
| **NABH** | NABH Accreditation Standards for Hospitals, 6th Edition, effective 1 Jan 2025, ISBN 978-81-965264-9-8 (official PDF from portal.nabh.co) | Objective elements read. Page = printed page |
| **DPDP Act** | Digital Personal Data Protection Act, 2023, Gazette copy from MeitY | Sections 4–8 read |
| **DPDP Rules** | DPDP Rules, 2025, G.S.R. 846(E), official MeitY PDF | Rule 1 (commencement) read only |
| **Report** | Your `sample-reports.pdf` (Shalby, 4 pages) | Read. Used for layout, field names, values |
| **Slides** | Your `Shalby_Laboratory_Instrumentation_Enhanced_16_Slides_v2.pptx` | Text read. Used for hospital spelling and instrument names |

**Kept separate from NABL/NABH:**

| Short name | Document | Status |
|---|---|---|
| **CLSI** | CLSI PRE02, *Collection of Diagnostic Venous Blood Specimens*, 8th Ed., 13 Feb 2025. **It replaces GP41-Ed7 (2017)**, so GP41 is no longer the current name | **Text not read.** The order of draw below comes from CLSI's own web article (19 Mar 2019), which cites GP41 |

**Not verified, so marked "unverified" wherever used:**

| Item | Why | What I need |
|---|---|---|
| Order of draw as printed in CLSI PRE02 | Paid document, not in `_ref_docs` | PRE02 PDF, or your OK to use the CLSI article's order |
| "Label before leaving the patient" wording | ISO, 112A, 112B and NABH do not say this in these words. ISO only requires an unequivocal link (7.2.4.4 d). It may be in PRE02 | Same PDF |
| Bio-Medical Waste Management Rules, 2016 (G.S.R. 343(E)), Schedule I bin colours | Government sites timed out. I saw only secondary summaries | Rules PDF as amended |
| NABH "Interpretation" text, for example which two identifiers (COP.1.b) | The 6th edition PDF gives objective elements. The change table says the interpretation adds details of two identifiers, but I did not find that text | NABH Guidebook, if you have it |
| DPDP exact start date for consent and notice duties | Rule 1 says 18 months from publication, so about May 2027. Secondary sources differ between 13 and 14 May. I did not read the Act's commencement notice | Your legal team to confirm |
| Later NABL amendments | NABL's website did not open for me. Your files are the latest I can confirm | Quick check by you on nabl-india.org |

**Common terms and where they appear:** I searched ISO, 112A, 112B and NABH. "Read-back", "chain of custody" and "WhatsApp" appear in none of them. "Delta check" appears only in the 112B flowchart (§5 p.26). "At least two identifiers" appears only in NABH COP.1.b. The figure still uses these common terms, and each row below cites the clause that carries the same idea.

**Copyright:** your ISO copy is watermarked as a single-user licence. The figure and this repo cite clause numbers and use my own plain wording. The ISO PDF stays out of the repo.

**Rule for numbers:** a number appears only if a source above gives it. Everything else shows **"per the lab's documented policy"**.

---

## 2. The setting

| Item | Value | Source |
|---|---|---|
| Hospital | Shalby Multi-Specialty Hospitals, SG Highway, Ahmedabad | Report footer. Spelling corrected from "Shelby" as you asked |
| Collection | Sample collection room, **basement** (no floor number on the wall) | You |
| Laboratory | **9th floor** | You |
| Transport | **By hand only.** No pneumatic tube | You |
| Doctor's room and report counter | Floors not known. Shown with no floor number until you tell me | Question 1 |

**The picture:** a cut-away hospital in Sketchbook style. Collection room at the bottom, a lift shaft in the middle, the lab at the top. The sample box rises by hand through the lift. This height is the one thing the figure can show that a flowchart cannot.

### Made-up patient data

Only patient details change. Lab values, ranges and methods stay as in your report.

| Field | Real report | In the figure |
|---|---|---|
| Patient name | (real, not repeated here) | **Mr Demo Patient** |
| PID | real | **SHLDEMO00001** |
| Lab ID | real | **DEMO00001** |
| DOB | real | **15-Mar-1952** (age stays 74) |
| Location | IP, ward and bed | **OPD**, because collection is in the collection room |
| Date | real | **12-Oct-2026**. My decision: a real date plus real results could identify the patient inside the hospital. Times stay as printed |
| Report barcode, QR code, doctor's signature image | real | **Not copied.** The barcode and QR may carry real data. New barcode encodes the demo ID only |
| Watermark | none | **"TEACHING SAMPLE: NOT A REAL REPORT"** on every report and screen |

### Times shown on the LIS screen (from the Report)

| Report field | Time | Note |
|---|---|---|
| Registered On | 02:58 PM | |
| Collected On | 03:00 PM | |
| Received On | CBC 03:14 PM, Serum 03:28 PM | Different times for each department. See Question 4 |
| Approved On | CBC 03:21 PM, Renal 03:49 PM | |
| Generated On | 04:11 PM | |

### Values shown (from the Report)

CBC: Hb 11.6 (L), RBC 3.66 (L), HCT 34.1 (L), MCV 93.3, MCH 31.8, MCHC 34.0, RDW-CV 13.4, TLC 7660, platelets 346000.
Glucose (R) 116.0 mg/dL.
Renal: creatinine 2.5 mg/dL (0.6–1.25), urea 62.0 (19–42), sodium 133.0 (135–145), **potassium 6.91 mmol/L (3.5–5.1)**, chloride 103.0 (98–107).

- **Potassium 6.91** is the story's critical result. Whether it crosses Shalby's limit is **per the lab's documented policy** (Question 3).
- **Left out:** the arterial blood gas on page 2. It is arterial, and pO2 535 suggests a patient on oxygen, so it does not fit a walk-in collection-room draw.
- **Coagulation and blood culture:** your report has no values, and I will not invent any. The coagulation tube and culture bottle travel and are processed, with the status shown as "Result: not shown in this teaching example" and "Incubating". The tube set is a teaching composite so that all four departments appear.

---

## 3. Steps and stations

Nine buttons, 22 stations, forward only. A problem opens a card on the spot. Nothing moves backwards: a recollection is a **new sample with a new number** that starts its own journey.

Last column: **all clauses were read by me unless marked unverified.**

"What the software records" uses the Report's field names where they exist. Other fields are what the standard needs recorded. Whether Shalby's LIS holds them in exactly this form needs your confirmation (Question 9).

### Step 1. ORDER

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 1 | ORDER | Doctor orders the tests | Treating doctor | Ref. By, tests, clinical details, routine or STAT | Clinical details missing. Unclear test: lab asks the doctor. Spoken order: needs written confirmation within a set time. Heparin or LMWH monitoring: purpose and collection time must be stated | ISO 7.2.3.1 b, d; 7.2.3.2. 112A §6h p.27 (clinical data); §7.3.1a p.40 (anticoagulant). NABH AAC.6.e |
| 2 | REGISTER | Registration gives a unique number | Front desk | PID, Lab ID, **Registered On** | Duplicate or wrong patient record. Reception must be separate from collection | NABH AAC.2.b (p.57). ISO 7.2.3.1 b; 6.3.5 c |

### Step 2. COLLECT (collection room, basement)

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 3 | READY | Check patient preparation | Phlebotomist | Fasting or medicine details when relevant | Not fasting when needed, last dose time unknown, timed sample at the wrong time. Record it, do not hide it. Room must give privacy, comfort, first aid | ISO 7.2.4.2 a, c, d; 7.2.4.4 b; 6.3.5. 112B §2 p.4 (privacy) |
| 4 | 2 IDs | Identify with two identifiers | Phlebotomist and patient | PID scan against request. Which two: per the hospital's written guidance | Same or similar name. Patient cannot speak. Wristband or request mismatch: stop before needle | **NABH COP.1.b (p.71, CORE): "at least two identifiers".** ISO 7.2.4.4 a |
| 5 | CONSENT | Consent | Phlebotomist or doctor | Recorded consent where needed | Routine draw: consent can be inferred when the patient willingly offers an arm. **HIV test and invasive procedures (FNA, lumbar puncture, marrow): informed consent required.** Emergency: may proceed in the patient's best interest | ISO 7.2.4.3 a–c. 112A §6h p.27. NABH PRE.4.a (p.105) |
| 6 | DRAW | Draw in the order of draw | Phlebotomist, gloved | Deviations, on the request form | See "Problems during collection" below | ISO 7.2.4.2 b; 7.2.4.4 c; 7.2.4.1. 112A §6h p.27. **Order: CLSI (separate), see section 4** |
| 7 | LABEL | Barcode label, patient still there | Phlebotomist | Collector's identity, **Collected On** | Label printed earlier and put on wrong tube. Unlabelled tube. Several tubes mixed up | ISO 7.2.4.2 e; 7.2.4.4 d, e. "Before leaving the patient": good practice, **exact wording unverified** |
| 8 | CARE | Patient care and sharps | Phlebotomist | Any adverse event | Bleeding, bruise, faint. Used sharps left out | ISO 7.2.4.4 h; 6.3.5 d. 112B §2a p.5 (first aid). NABH IPC.4.d (p.115). Bin colours **unverified** |

**Problems during collection (cards at station 6)**

| Problem | What to do | Source |
|---|---|---|
| Difficult draw | Record the deviation on the request. Lab judges the risk to the result. Number of attempts: per the lab's documented policy | 112A §6h p.27. ISO 7.2.4.1 |
| Syringe needed | Evacuated system preferred. If a syringe is needed, use a safety transfer device, do not open tube caps | 112A §6h p.27 |
| Line or winged set | Use a suitable adapter for direct draw into tube | 112A §6h p.27 |
| Haemolysis | No standard sets a limit. It is a rejection criterion or a report comment, per the lab's documented policy | ISO 7.2.6.1 b; 7.4.1.7 d 1 |
| Wrong tube | Compromised sample, handle by exceptions process | ISO 7.2.6.2 a 4 |
| Underfill or overfill | A tube is not filled to the top: its vacuum draws a set volume, then the blood stops. Too little volume is a compromised sample. Citrate tubes must reach the fill mark (9:1). Coagulation tubes need written rejection guidelines and training | ISO 7.2.6.2 a 5. 112A §7.3.1a p.40. Separate from NABL and NABH: BD Tech Talk VS9016, 05/11 |
| Faint or adverse reaction | First aid, tell the responsible person, record it. Staff trained in first aid. Exact aftercare steps: per the lab's documented policy | ISO 6.3.5 d. 112B §2a p.5 |
| Needle-stick | Record injury and action. Post-exposure prophylaxis as per hospital programme | 112B §2c p.5. NABH IPC.7.d, e (p.117) |

### Step 3. CARRY (basement to 9th floor, by hand)

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 9 | PACK | Pack: tube, leak-proof bag, rigid box | Phlebotomist | Dispatch time. **A log of collection time goes with the samples** | Loose tubes in a pocket or hand. Temperature-sensitive or light-sensitive sample packed as routine | 112A §6h p.28 (triple packaging), p.29 (collection time log, applies at the main lab's collection facility too). ISO 7.2.5 a 1, a 4 |
| 10 | CARRY | Hand-carry up the lift | Sample carrier (Question 2) | Handover: who gave, who took, when | **Delay, left unattended, dropped, spill.** Time limit: **per the lab's documented policy** after a risk assessment. Context only: NABL notes many analytes are stable at room temperature for 2–4 hours from collection. Some need 4–8 °C or frozen (for example ammonia, ACTH) | ISO 7.2.5 a 2, a 3, b, c; 7.2.7.3. 112A §6h p.27–28. 112B §2 p.4. "Chain of custody": not a term in these standards; ISO 7.2.4.4 e and 7.2.6.1 c, d carry the idea |

**Spill card:** cover with blotting paper or paper towel, pour 1% hypochlorite, leave 30 minutes, discard in yellow or red bags as per waste guidelines (112B §2b p.5). If integrity is lost and there is a health risk, notify at once (ISO 7.2.5 b).

### Step 4. RECEIVE (lab, 9th floor)

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 11 | SCAN | Scan the barcode, STAT first | Receiving staff | **Received On**, who received. Screen shows Collected On and Received On side by side | Barcode does not read: never type a guess. STAT in the same queue as routine | ISO 7.2.6.1 a, c, d, f |
| 12 | ACCEPT? | Accept or reject | Authorised receiving staff | Accepted, or rejected with reason, and who was told | See cards below | ISO 7.2.6.1 b, e; 7.2.6.2. 112A §6h p.29; §7.3.1a p.40. 112B §2 p.5 |

**Reject card:** record the reason. Tell the collector, doctor or nurse. Collect again under a **new sample number**. Reasons must be communicated to the people responsible for collection (stated for coagulation tubes in 112A §7.3.1a p.40). Sample collection and identification are monitored as quality indicators (112A §6m p.36).

**Precious sample card:** when a compromised sample is clinically critical or cannot be replaced, the lab weighs patient risk. If accepted, the final report must say what was wrong and advise caution (ISO 7.2.6.2 b; 112A §6h p.29).

**Temperature card:** a sample not kept at the required temperature in transit is not accepted for testing (112B §2 p.5).

### Step 5. PREPARE

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 13 | SPIN | Centrifuge if needed | Lab technician | Time, aliquot barcodes traceable to the original | Serum spun before clotting: time per the lab's documented policy and tube maker. Centrifuge should not share a bench with analysers. Aliquot not traceable | ISO 7.2.6.1 g; 7.2.7.1; 7.2.7.3. 112A §6b p.20 |
| 14 | SEND | Send to departments | Lab technician | Worklist per department | EDTA goes unspun to haematology. Citrate spun for plasma, to coagulation. Serum to biochemistry. Culture bottle to microbiology. Wrong bench | ISO 7.2.7.1. Report (tube and test). Slides (departments). Bench routing is general practice, marked "typical" |

### Step 6. TEST

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 15 | QC OK? | Is today's QC in control? | Lab technician | IQC values, LJ chart, reviewer | **QC is on a schedule, not per sample.** See QC card below | 112A §6i iv p.31. ISO 7.3.7.2. NABH AAC.7.b (p.61) |
| 16 | RUN | Run on the analyser | Lab technician | Analyser results sent to LIS, operator identity | Sample probe clot, flags, interface error. Results not released yet | ISO 7.3.1 d; 7.6.3. 112A §6k p.35 (interfaces) |

**QC card (NABL numbers, 112A §6i iv p.31):** two levels on the day of testing, then one level every shift or 8 hours, at fixed times. Frequency may also follow risk assessment. LJ charts plotted and reviewed daily. Accept or reject rules based on standard guidelines.

**QC fails card:**
1. Stop release of patient results (ISO 7.3.7.2 g; 7.5 c).
2. Find the cause: recent events, environment, maker's guide (112A p.31).
3. Fix it, rerun QC. An authorised person restarts work (ISO 7.5 g).
4. Re-run the affected patient samples, and **check all patient results since the last good QC** (ISO 7.3.7.2 g 1, 2).
5. If wrong results already went out, revise them and tell the user (ISO 7.5 f).

Microbiology and coagulation appear in the same step. Coagulation shows a QC and analyser picture only. The culture bottle goes into the incubator with "Incubating, preliminary report if positive" (ISO 7.4.1.4 b for preliminary and final reports).

### Step 7. CHECK AND SIGN

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 17 | CHECK | Technical check, including delta | Lab technician | Flags, comments, previous result beside the new one | Result does not fit: repeat, check for haemolysis or clot before accepting. **High potassium: look for haemolysis, but do not delay a true critical call.** Delta limits: per the lab's documented policy. CBC: check for clots when platelets are low; test within 8 hours, never past 24 hours (unless a stability study supports up to 48) | ISO 7.4.1.2; 7.4.1.7 d 1, d 4. 112A §7.3.1b p.40. 112B §5 p.26 (flowchart: delta check within limit before automated reporting; if not, do not auto-release, consult authorised personnel). ISO's "previous examination results" carries the same idea |
| 18 | SIGN | Authorisation by a competent person | Pathologist or authorised person | **Approved On**, name of authoriser | Unauthorised release. After hours: trained staff issue a preliminary result, authoriser reviews next working day and issues final. Auto-verified reports must be marked "Auto verified" and can be suspended quickly | ISO 7.4.1.2; 6.2.3 b; 7.4.1.5; 7.4.1.6 j. 112A p.12, §6j i p.33, §6j iii, iv p.34. NABH AAC.6.d (p.60) |

### Step 8. TELL (two different paths)

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 19 | CRITICAL | Critical alert: phone call with read-back | Lab staff to doctor | **Date, time, who called, who was told, result given, read-back done, any difficulty** | Doctor unreachable: **escalation** to the next person, per the lab's procedure. Critical list not displayed. Message sent with no check that it was understood. Patient has already gone home: doctor decides how to reach them | ISO 7.4.1.3 a–c; 7.4.1.4 c; 7.4.1.6 l. 112A §6j ii p.33. NABH AAC.6.g (p.60), AAC.9.h (p.63, Excellence: checks that care followed the alert). "Read-back" = ISO's "verification of accuracy of communication" |
| 20 | REPORT | Routine report and notice | LIS and report counter | **Generated On**, delivery log, who collected a hard copy | Sent to the wrong number. Sensitive result sent with no counselling. Delay not told to the user. Report missing a required item | See below |

**Why two paths:** a critical result needs a person to hear it, repeat it and act now. A routine report needs only to reach the right person safely. A WhatsApp message must never be the only critical alert: no read-back is possible in the required way (my reading of ISO 7.4.1.3 b).

**Report contents:** unique patient ID, sample date and issue date on each page, lab name, doctor, sample type, method where relevant, units, reference intervals, authoriser, critical flag, page x of y (ISO 7.4.1.6). Each page and end marker: already in your report.

**Turnaround time:** the lab sets and publishes it. No standard here sets a number for these tests (ISO 7.2.2 c; 7.4.1.1 b; 112A §3 xx and §6m; NABH AAC.6.f, p.60). The figure shows the report's real timestamps and "target: per the lab's documented policy".

**Amended report card:** the old report is never overwritten. Issue a new, clearly marked revised report, with reason, original date and patient identity, and tell the user (ISO 7.4.1.8; 7.5 f; NABH AAC.6.i, p.60).

**Hard copy:** collected from the designated counter, after identity check. Identity check at the counter is my safeguard, based on ISO 4.2 and NABH PRE.2.d. Counter location: Question 1.

### WhatsApp: your question answered

**Does it need consent or safeguards?**

- **Accreditation standards:** none of ISO, NABL 112A, 112B or NABH mentions WhatsApp. I searched all four.
- **Electronic reports are allowed** if all requirements are still met (ISO 7.4.1.1 NOTE). So WhatsApp is not forbidden.
- **Confidentiality is required:** ISO 4.2.1, 4.2.3, 7.6.3 c. 112A §6k p.35–36 (confidentiality, role-based access, audit trail). NABH PRE.2.d (p.103, CORE), IMS.5.a (p.170, CORE).
- **Law:** under the DPDP Act, personal data may be processed with consent (s.4(1)(a), s.5 notice, s.6) or for "certain legitimate uses" (s.4(1)(b), s.7), which include data given voluntarily for a stated purpose (s.7(a)) and a medical emergency (s.7(f)). The fiduciary must keep reasonable security safeguards (s.8(5)). Notice and consent duties start about May 2027 (DPDP Rules, Rule 1; **exact date unverified**).
- **This is not legal advice.** Whether Shalby relies on consent or s.7(a) is for your legal or compliance team.

**What the figure teaches (recommended safeguards, my recommendation, not a clause):**
1. Patient opts in at registration, and this is recorded.
2. Number is confirmed with the patient.
3. Send a notice plus a secure link or OTP where possible, rather than the open PDF.
4. Sensitive results (HIV, genetic) are not sent this way without counselling (ISO 7.4.1.4 d).
5. Delivery is logged.
6. Hard copy stays available.

### Step 9. FINISH

| # | Label | Full name | Who | What the software records | What can go wrong | Source |
|---|---|---|---|---|---|---|
| 21 | STORE | Store and find again | Lab technician | Rack and position, discard date | Cannot find sample for added test. Time limits for added tests set by the lab | ISO 7.4.2 a–d; 7.2.7.2 |
| 22 | DISCARD | Discard as biomedical waste | Lab staff | Waste log | Wrong bin. Pre-treatment of lab waste missed | ISO 7.4.2 e; 6.3.3 c. 112A §6j vi p.35. NABH IPC.4.d (p.115). Bin colours and pre-treatment: **BMW Rules, unverified** |

**Minimum storage shown (NABL):**

| Sample | Minimum | Source |
|---|---|---|
| Biochemistry | 1 day at 2–8 °C, except unstable tests | 112A §7.1c p.38 |
| CBC | Up to 24 hours at 2–8 °C | 112A §7.3.1 p.42 |
| Coagulation | Up to 4 hours at room temperature | 112A §7.3.1 p.42 |
| Microbiology serum | 3 days at 2–8 °C (HIV: 7 days, NACO) | 112A §7.4h p.51 |
| Culture samples | Until final identification and AST report; sterile fluids 10 days at 2–8 °C | 112A §7.4h p.51 |
| Request forms, worksheets, reports | 1 month minimum | 112A §6l Table 2 p.36 |

---

## 4. Order of draw (CLSI, not NABL/NABH)

The figure labels this: **"Order from CLSI. NABL requires an order of draw be followed (112A p.27) but does not list it."**

| Order | Tube | Cap (examples) | In this story? |
|---|---|---|---|
| 1 | Blood culture bottle | | Yes |
| 2 | Sodium citrate | Blue | Yes |
| 3 | Serum, with or without clot activator or gel | Red, gold | Yes |
| 4 | Heparin | Green | Greyed out |
| 5 | EDTA | Lavender, pink | Yes |
| 6 | Fluoride/oxalate | Grey | Greyed out |

Source: CLSI web article "Order of Blood Draw Tubes and Additives", 19 Mar 2019, citing GP41. **PRE02-Ed8 text unverified.** Cap colours vary by maker.

---

## 5. Not per sample: the "Always running" panel

These do not sit on the sample's path. A side panel, not a station, so nobody thinks they happen for each tube.

| What | How often | Source |
|---|---|---|
| Calibration, traceable reference materials | Per procedure and maker; status recorded | ISO 6.5.2; 6.5.3. 112A §6i iv p.32 |
| EQA / proficiency testing | Per scheme, handled by routine staff, corrective action recorded | ISO 7.3.7.3. 112A §6i iv p.32. NABH AAC.7.c (p.61) |
| Comparing two analysers | At least twice a year | ISO 7.3.7.4. 112A §6i vi p.33 |
| Lab information system check | Half-yearly, at least 10 sample or test types | 112A §6k p.35 |
| LIS down plan | Planned in advance | ISO 7.6.4 |
| Staff training, competence, authorisation | Ongoing | ISO 6.2. 112A p.12, p.19. NABH AAC.6.d |
| Quality indicators (collection, transport, TAT, complaints, EQA) | Ongoing | ISO 8.8.2. 112A §6m p.36–37 |
| Internal audit | At least once in 12 months | 112A §6m ii p.37 |
| Biosafety: PPE, safety programme, training | Ongoing | ISO 6.3.4. NABH AAC.7.e–g (p.61), IPC.7 (p.117) |

---

## 6. The window

Two windows on the right of the figure, updated at every station.

**A. LIS screen** (the main teaching tool). Fields fill one by one: PID, Lab ID, Ref. By, Registered On, Collected On, Collector, Received On, Approved On, Generated On. Watermarked. An empty field in red is the chain breaking.

**B. Close-up**, changing with the station:

| After step | Shows |
|---|---|
| Order | Request with tests and clinical details |
| Collect | Tubes filling in order, then barcode label |
| Carry | Tube inside bag inside box, with collection log |
| Receive | Scanner beam; green tick or red reject |
| Prepare | Serum tube before and after spin, showing separated layers |
| Test | LJ chart with QC points in control, then the result arriving held |
| Check and sign | New potassium beside "previous result", haemolysis check, then signature |
| Tell | Split: phone call transcript on the left, WhatsApp notice and counter on the right |
| Finish | Rack in fridge with discard date; bin |

---

## 7. Wrong-order presses

| Pressed too early | What the page says |
|---|---|
| Draw before ID | "Who is this patient? Check two identifiers first." |
| Carry before label | "An unlabelled tube has no owner. Label it with the patient present." |
| Carry before pack | "Tubes travel in a leak-proof bag inside a rigid box." |
| Run before accept | "The lab has not accepted this sample yet. Check it first." |
| Run before spin | "Serum and citrate need spinning before these tests." |
| Release before QC | "Patient results stay held until QC is in control." |
| Report before sign | "A competent person must review and authorise first." |
| Routine report before critical call | "Critical result: phone the doctor first. Do not wait for the report." |
| Discard before report | "Keep the sample. A repeat or added test may be needed." |

---

## 8. Cast and teaching poses

Illustrated people, as the skill requires. Cast sheet goes to you first. Indian cast, skin tones varied.

| Person | Appears at | Pose that teaches something | Check against |
|---|---|---|---|
| Treating doctor | 1, 19 | Writing order; on the phone repeating value | ISO 7.4.1.3 |
| Front desk staff | 2 | Handing token | |
| Mr Demo Patient, 74 | 2–8, 20 | Seated, arm out; saying his name; pressing cotton; reading phone | NABH COP.1.b |
| Phlebotomist | 3–9 | Asking name, reading wristband or request; gloved draw with evacuated holder; labelling beside the patient; dropping sharps in bin | 112A p.27 |
| Sample carrier | 10 | Carrying rigid box in the lift, upright | 112A p.28 |
| Lab technician | 11–17, 21–22 | Scanning; centrifuge with lid closed; reading LJ chart; phone call | 112A p.31 |
| Pathologist | 18 | Reviewing and signing on screen | ISO 7.4.1.2 |

**Image source:** Higgsfield unless you say otherwise. About 3 credits per image by the skill's 2026 note; roughly 15–20 images, about 60 credits of your 7,200. I will confirm the current price before generating.

---

## 9. Page and video

- **Style:** Sketchbook only. Fits because the figure's value is the path through a building, on phones as well.
- **Footer:** "Made with ♥ and a passion for teaching pathology · Dr. Atul Tiwari", QR to https://atultiwari.com/ on laptop, plain link on phone.
- **Video:** 16:9, 7–9 minutes, and 9:16 Short of 60–90 seconds on critical alert vs routine report. Both silent-narration: **on-screen captions only, no TTS for now**, with soft music.
- **Later voice:** `youtube-video-production` normally lets the voice set the timing. Adding voice later means re-timing the video to the takes, which is expected and cheap if the captions are final.
- **Not published.** Nothing is pushed, posted or uploaded without asking. Promo kit only after you approve the video.

---

## 10. Changes I made to your draft, and why

| # | Your draft | Change | Why |
|---|---|---|---|
| 1 | Starts at patient identification | Added ORDER and REGISTER first | The journey starts at the request (ISO 7.2.3; 112A definition, §3 xv p.14) |
| 2 | (absent) | Added patient preparation | ISO 7.2.4.2 a, 7.2.4.4 b |
| 3 | "Patient identification" | Now "at least two identifiers", before the needle | NABH COP.1.b |
| 4 | (absent) | Added consent, with when it can be inferred | ISO 7.2.4.3. 112A p.27 |
| 5 | "any problem is managed" | Named problems, each with an action and a record | ISO 7.2.4.1. 112A p.27 |
| 6 | Label comes after draw only | Label with the patient present | ISO 7.2.4.4 d; wording unverified |
| 7 | (absent) | Added patient care, sharps | ISO 6.3.5 d; 7.2.4.4 h |
| 8 | "Sample transportation" | Split into PACK and CARRY, by hand from the basement to the 9th floor; time and temperature; spill card; handover record | ISO 7.2.5. 112A p.27–29. 112B p.5. Your correction on tubes and floors |
| 9 | "Software accepts the sample after recognising the barcode" | **Separated: the scan records receipt; a trained person decides acceptance** | A barcode read proves identity only, not sample quality (ISO 7.2.6.1 e) |
| 10 | (absent) | Added reject, recollect, inform, new sample number; precious-sample rule | ISO 7.2.6.1 b; 7.2.6.2. 112A p.29, p.40 |
| 11 | (absent) | STAT handling | ISO 7.2.6.1 f |
| 12 | "Before running a sample on any machine, QC is checked" | **QC runs on a schedule; the check at the sample is "is QC in control?", and results are held if not** | 112A p.31. ISO 7.3.7.2 d, g |
| 13 | (absent) | QC-fail path, including look-back to the last good QC | ISO 7.3.7.2 g; 7.5 |
| 14 | (absent) | Calibration, EQA moved to the "Always running" panel | They are not per-sample (ISO 6.5.2; 7.3.7.3) |
| 15 | "Sample run" goes straight to alert | Added technical check, delta, then authorisation | ISO 7.4.1.2. 112A p.33. 112B §5 p.26 |
| 16 | "Alert to clinician" as routine | **Split: critical call with read-back and log, separate from routine notice** | ISO 7.4.1.3; 112A p.33; NABH AAC.6.g |
| 17 | WhatsApp as a plain step | Kept, with opt-in and safeguards; never the only critical alert | ISO 4.2, 7.4.1.1 NOTE; DPDP Act s.4–8. Safeguards are my recommendation |
| 18 | (absent) | Turnaround time, amended report | ISO 7.4.1.1 b, 7.4.1.8. NABH AAC.6.f, i |
| 19 | Ends at the report | Added storage, retention, disposal | ISO 3.23 and 7.4.2. 112A p.35, 38, 42, 51 |
| 20 | "Centrifuge if necessary" before routing | Kept, with spin and route as two stations | Different actions, and not all tubes are spun |
| 21 | (none) | Sample is collected in the basement, lab on the 9th floor, by hand | Your correction |

---

## 11. Things I noticed in your sample report

For you to judge. None of these goes into the figure as a criticism.

1. **Potassium 6.91 and creatinine 2.5 have no flag on page 4,** though CBC uses "L" flags. ISO 7.4.1.6 l asks for indication of critical results, unless the lab has documented reasons to omit. If 6.91 is above Shalby's limit, the printed report shows no sign of it. This may be worth checking in the LIS.
2. **Typing errors in method lines:** "Clorimetric" and "Impendance" (p.1). I will print them corrected unless you prefer them as they are.
3. **The instrument slides list no haematology analyser,** while the report names "SF Cube" technology. So analysers are drawn generic, labelled by department.
4. **Glucose lists sample type "Heparin Blood, Serum"** because it shares a page header with the ABG. In the figure, glucose is shown from the serum tube. Please correct me if Shalby uses another tube.

---

## 12. Questions (defaults apply if you say nothing)

| # | Question | Default |
|---|---|---|
| 1 | Floors | Answered: OPD, information desk, registration and report counter on the ground floor; collection in the basement; lab on the 9th floor |
| 2 | Who carries samples (job title)? Do they use a rigid box and leak-proof bags for the internal trip? Which lift? | "Sample carrier", triple pack (112A p.28), "lift" |
| 3 | What is Shalby's critical limit for potassium, and who phones whom? | Show "above the lab's critical limit, per documented policy", with no number. Lab staff phone the doctor |
| 4 | Report shows different Received On for CBC (03:14) and serum (03:28), though all were collected at 03:00. Is that central receiving or departmental? | Show both as departmental receipt after one central scan |
| 5 | Keep the real doctors' names (Ref. By and the two pathologists) on a report with a fictional patient? You said change only patient details, but it puts real names on a teaching report with a critical value | Answered: keep the names, confirmed by Dr. Tiwari for the public page, 2 Nov 2026 |
| 6 | Use the Shalby logo and the NABL mark (MC-2422)? | Logo yes, from your report. **NABL mark no,** because I have not read NABL's rules on using the mark |
| 7 | Which two identifiers does Shalby use? | Full name and PID |
| 8 | Do you have coagulation and blood culture examples to show? | No values shown |
| 9 | LIS name and real screens? Does it store collector, carrier and critical-call log? | Generic "LIS" screen using report field names |
| 10 | How are WhatsApp reports sent now (PDF or link, opt-in or not)? | Figure teaches recommended safeguards, and does not claim that this is Shalby's current practice |
| 11 | Can you add CLSI PRE02 and BMW Rules 2016 to `_ref_docs`? | CLSI article's order and bin colours stay marked unverified on screen |

## 13. Places (changed after your review of the first draft)

The floating cut-away floors are gone. Each place is its own hand-inked sketch, with no floor numbers on any wall. Each station has its own scene with the approved cast in it, made as an edit of the empty room, so people sit behind desks and hold things properly. Printed labels, the ring and the department names are laid over the scene by code, so no scene contains invented text.

| Place | Floor | Stations |
|---|---|---|
| Building sketch, from your photo of SG Shalby Hospital | | Opening, arriving, and the report going down |
| A generic lift, not placed in the building | | The patient going down, CARRY |
| Doctor's consulting room | Ground | ORDER |
| Main lobby: registration counter and information desk | Ground | REGISTER |
| Sample collection room | Basement | READY, 2 IDs, CONSENT, DRAW, LABEL, CARE, PACK |
| Sample receiving, with pass-through hatch | 9th | SCAN, ACCEPT? |
| Processing room, centrifuges | 9th | SPIN |
| Lab corridor: Haematology, Biochemistry, Coagulation, Microbiology | 9th | SEND |
| Analyser section | 9th | QC OK?, RUN, CHECK |
| Pathologist's office | 9th | SIGN, CRITICAL |
| Report counter | Ground | REPORT |
| Storage and waste | 9th | STORE, DISCARD |

Journeys between floors are not stations. Arriving and the report going from the 9th floor to the ground floor are shown on the building sketch; the patient going down is shown in the generic lift. Where the real lift is, is not known, so the building sketch shows no lift or route. Floor labels on it are indicative.

The lift ride is made from still images and code: the closed-door picture slides apart, and one storey of shaft repeats behind the car. Only the stills cost image credits.

**Tube filling.** Tubes are drawn stopping at their draw volume, with space below the cap. The citrate tube shows a fill mark. Source, separate from NABL and NABH: BD Vacutainer Tech Talk VS9016 (05/11): "minimum fill indicator etched into the tube" on plastic citrate tubes; filling is to the stated draw volume. No source found for a printed mark on EDTA tubes, so none is drawn.

## 14. Moving through the stations

The player works like an old cassette player: First, Previous, Play, Pause, Stop, Next, Last. Durations do not change. Previous and Next move one station at a time, because each station has its own text. They hold on that station until Play is pressed, and Play carries on from the next station. The sample never animates backwards: the picture simply changes. Stepping does not replay the journeys between floors.

