import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,700;0,900;1,300;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0B0B0B;
  --surface:#141414;
  --surface2:#1C1C1C;
  --border:#272727;
  --border-light:#353535;
  --cream:#F4EFE6;
  --cream-dim:#B8AFA0;
  --gold:#C4993A;
  --gold-dim:rgba(196,153,58,0.14);
  --gold-glow:rgba(196,153,58,0.07);
  --text-primary:#F4EFE6;
  --text-secondary:#8E8478;
  --text-muted:#504B46;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text-primary);font-family:'Outfit',sans-serif;overflow-x:hidden;cursor:none;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--gold);}

.cursor-dot{position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;
  background:var(--cream);border-radius:50%;transform:translate(-50%,-50%);
  transition:width 0.15s,height 0.15s;}
.cursor-ring{position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;
  border:1px solid rgba(244,239,230,0.3);border-radius:50%;transform:translate(-50%,-50%);
  transition:all 0.1s ease;}
.cursor-ring.hov{width:50px;height:50px;border-color:var(--gold);background:rgba(196,153,58,0.04);}

@keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.95);}to{opacity:1;transform:scale(1);}}

.rv{opacity:0;transform:translateY(26px);transition:opacity 0.75s cubic-bezier(0.16,1,0.3,1),transform 0.75s cubic-bezier(0.16,1,0.3,1);}
.rv.in{opacity:1;transform:translateY(0);}
.rvl{opacity:0;transform:translateX(-22px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1);}
.rvl.in{opacity:1;transform:translateX(0);}
.rvr{opacity:0;transform:translateX(22px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1);}
.rvr.in{opacity:1;transform:translateX(0);}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 56px;height:64px;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(11,11,11,0.75);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);transition:background 0.4s;}
.nav.s{background:rgba(11,11,11,0.97);}
.logo{font-family:'Fraunces',serif;font-size:19px;font-weight:900;font-style:italic;
  cursor:pointer;color:var(--cream);letter-spacing:-0.3px;}
.nl{display:flex;gap:2px;}
.nb{background:none;border:none;font-family:'Outfit',sans-serif;font-size:11px;
  font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);
  cursor:pointer;padding:8px 14px;border-radius:3px;transition:all 0.25s;}
.nb:hover,.nb.a{color:var(--cream);}
.nb.a{background:rgba(244,239,230,0.05);}
.ncta{background:var(--gold);color:#0B0B0B;border:none;font-family:'Outfit',sans-serif;
  font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  cursor:pointer;padding:9px 20px;border-radius:3px;transition:all 0.25s;}
.ncta:hover{background:var(--cream);transform:translateY(-1px);}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;
  padding:120px 56px 80px;overflow:hidden;}
.hbg{position:absolute;inset:0;}
.hgrid{position:absolute;inset:0;
  background-image:linear-gradient(var(--border) 1px,transparent 1px),
    linear-gradient(90deg,var(--border) 1px,transparent 1px);
  background-size:80px 80px;opacity:0.4;}
.hglow{position:absolute;width:700px;height:700px;border-radius:50%;top:-150px;right:-150px;
  background:radial-gradient(circle,rgba(196,153,58,0.06) 0%,transparent 65%);
  pointer-events:none;}

.heyebrow{display:flex;align-items:center;gap:12px;margin-bottom:30px;
  opacity:0;animation:fadeIn 0.5s 0.15s ease forwards;}
.heline{width:36px;height:1px;background:var(--gold);}
.hetxt{font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--gold);}
.hname{font-family:'Fraunces',serif;font-size:clamp(52px,8.5vw,108px);font-weight:900;
  line-height:0.92;letter-spacing:-3px;color:var(--cream);
  opacity:0;animation:fadeUp 0.85s 0.25s cubic-bezier(0.16,1,0.3,1) forwards;}
.hname em{font-style:italic;font-weight:300;
  background:linear-gradient(135deg,var(--cream),var(--gold));
  background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:shimmer 4s linear infinite;}
.htrow{display:flex;align-items:center;gap:16px;margin-top:24px;
  opacity:0;animation:fadeUp 0.85s 0.42s cubic-bezier(0.16,1,0.3,1) forwards;}
.hrole{font-size:clamp(15px,2vw,20px);color:var(--text-secondary);font-weight:300;}
.hsep{width:5px;height:5px;border-radius:50%;background:var(--gold);flex-shrink:0;}
.hco{font-size:clamp(15px,2vw,20px);color:var(--cream);font-weight:600;}
.hdesc{margin-top:26px;font-size:15px;color:var(--text-secondary);line-height:1.9;
  max-width:500px;font-weight:300;
  opacity:0;animation:fadeUp 0.85s 0.56s cubic-bezier(0.16,1,0.3,1) forwards;}

.hmetrics{display:flex;gap:0;margin-top:48px;max-width:540px;
  border:1px solid var(--border);border-radius:6px;overflow:hidden;
  opacity:0;animation:fadeUp 0.85s 0.7s cubic-bezier(0.16,1,0.3,1) forwards;}
.hm{flex:1;padding:20px 22px;border-right:1px solid var(--border);
  cursor:pointer;transition:background 0.3s;}
.hm:last-child{border-right:none;}
.hm:hover{background:var(--gold-glow);}
.hmn{font-family:'Fraunces',serif;font-size:24px;font-weight:700;color:var(--cream);}
.hmn span{font-size:13px;color:var(--gold);}
.hml{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--text-muted);margin-top:4px;}

.hactions{display:flex;gap:12px;margin-top:32px;
  opacity:0;animation:fadeUp 0.85s 0.85s cubic-bezier(0.16,1,0.3,1) forwards;}
.bgold{background:var(--gold);color:#0B0B0B;border:none;font-family:'Outfit',sans-serif;
  font-size:13px;font-weight:700;letter-spacing:0.3px;cursor:pointer;
  padding:13px 26px;border-radius:3px;transition:all 0.3s;}
.bgold:hover{background:var(--cream);transform:translateY(-2px);box-shadow:0 6px 28px rgba(196,153,58,0.3);}
.boutline{background:transparent;color:var(--cream);border:1px solid var(--border-light);
  font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;
  padding:12px 22px;border-radius:3px;transition:all 0.3s;}
.boutline:hover{border-color:var(--cream);background:rgba(244,239,230,0.04);}

/* SECTION */
section{padding:100px 56px;}
.shd{display:flex;align-items:flex-end;gap:20px;margin-bottom:64px;
  padding-bottom:24px;border-bottom:1px solid var(--border);}
.snum{font-family:'Fraunces',serif;font-size:72px;font-weight:900;font-style:italic;
  color:var(--surface2);line-height:1;user-select:none;flex-shrink:0;}
.stw{flex:1;}
.slbl{font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold);margin-bottom:8px;}
.stitle{font-family:'Fraunces',serif;font-size:clamp(28px,3.5vw,44px);font-weight:700;
  line-height:1.1;letter-spacing:-1px;}
.stitle em{font-style:italic;font-weight:300;color:var(--text-secondary);}

/* TIMELINE */
.tl{position:relative;padding-left:44px;}
.tlspine{position:absolute;left:0;top:0;width:1px;height:0;
  background:linear-gradient(to bottom,var(--gold) 0%,rgba(196,153,58,0.2) 100%);
  transition:height 2.4s ease;}
.tlspine.on{height:100%;}

.tli{position:relative;padding-bottom:56px;}
.tli:last-child{padding-bottom:0;}
.tlnode{position:absolute;left:-51px;top:8px;width:14px;height:14px;
  border-radius:50%;border:2px solid var(--gold);background:var(--bg);}
.tlnode.active{background:var(--gold);box-shadow:0 0 14px rgba(196,153,58,0.45);}
.tlconnect{position:absolute;left:-45px;top:22px;bottom:0;width:1px;background:var(--border);}
.tli:last-child .tlconnect{display:none;}

.tlyear{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold);margin-bottom:10px;}
.tlcard{background:var(--surface);border:1px solid var(--border);border-radius:6px;
  padding:26px 30px;transition:all 0.4s;cursor:pointer;position:relative;overflow:hidden;}
.tlcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gold),transparent);
  transform:scaleX(0);transform-origin:left;transition:transform 0.45s;}
.tlcard:hover{border-color:var(--border-light);transform:translateX(5px);
  box-shadow:0 6px 36px rgba(0,0,0,0.45);}
.tlcard:hover::before{transform:scaleX(1);}
.tlch{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;}
.tlrole{font-family:'Fraunces',serif;font-size:21px;font-weight:700;letter-spacing:-0.3px;}
.tlorg{font-size:13px;color:var(--gold);font-weight:500;margin-top:3px;}
.tlbadge{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
  padding:4px 11px;border-radius:3px;white-space:nowrap;}
.active-b{background:rgba(196,153,58,0.1);color:var(--gold);border:1px solid rgba(196,153,58,0.28);}
.done-b{background:var(--surface2);color:var(--text-muted);border:1px solid var(--border);}
.tldesc{font-size:14px;color:var(--text-secondary);line-height:1.8;font-weight:300;}
.tlchips{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;}
.tlchip{font-size:11px;font-weight:500;color:var(--cream-dim);
  background:rgba(244,239,230,0.04);border:1px solid var(--border);
  padding:4px 11px;border-radius:3px;transition:all 0.3s;}
.tlchip:hover{border-color:var(--gold);color:var(--gold);}
.tlimpact{margin-top:16px;background:rgba(196,153,58,0.05);
  border-left:2px solid var(--gold);padding:11px 15px;
  font-size:13px;color:var(--gold);font-weight:500;border-radius:0 4px 4px 0;}
.tlbtn{margin-top:14px;background:none;border:1px solid var(--border);
  color:var(--text-secondary);font-family:'Outfit',sans-serif;font-size:11px;
  font-weight:600;letter-spacing:1px;text-transform:uppercase;
  cursor:pointer;padding:8px 16px;border-radius:3px;transition:all 0.3s;}
.tlbtn:hover{border-color:var(--gold);color:var(--gold);}

/* EDU */
.edugrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;}
.educard{background:var(--surface);border:1px solid var(--border);border-radius:6px;
  padding:24px;transition:all 0.4s;cursor:pointer;position:relative;overflow:hidden;}
.educard::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gold),transparent);
  transform:scaleX(0);transform-origin:left;transition:transform 0.4s;}
.educard:hover{border-color:var(--border-light);transform:translateY(-4px);
  box-shadow:0 10px 44px rgba(0,0,0,0.4);}
.educard:hover::after{transform:scaleX(1);}
.eduyr{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold);margin-bottom:8px;}
.edudeg{font-family:'Fraunces',serif;font-size:17px;font-weight:700;
  letter-spacing:-0.3px;line-height:1.25;margin-bottom:5px;}
.eduinst{font-size:12px;color:var(--text-muted);margin-bottom:18px;}
.eduscore{font-family:'Fraunces',serif;font-size:32px;font-weight:700;color:var(--cream);}
.eduunit{font-size:12px;color:var(--text-muted);margin-left:3px;}
.edunote{font-size:11px;color:var(--gold);font-weight:600;margin-top:5px;}

/* ACHIEVEMENTS */
.achgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.achrow{background:var(--surface);border:1px solid var(--border);border-radius:6px;
  padding:22px 26px;display:flex;gap:18px;align-items:flex-start;
  transition:all 0.35s;cursor:pointer;}
.achrow:hover{border-color:var(--border-light);transform:translateX(4px);}
.achibox{width:40px;height:40px;border-radius:5px;display:flex;align-items:center;
  justify-content:center;font-size:17px;flex-shrink:0;background:var(--gold-dim);}
.achlbl{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold);margin-bottom:5px;}
.achtit{font-size:14px;font-weight:600;color:var(--cream);line-height:1.3;margin-bottom:5px;}
.achdesc{font-size:12px;color:var(--text-secondary);line-height:1.65;font-weight:300;}
.achyr{margin-left:auto;font-size:11px;font-weight:600;color:var(--text-muted);white-space:nowrap;}

/* SKILLS */
.sklayout{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
.sktitle{font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;
  color:var(--gold);margin-bottom:28px;display:flex;align-items:center;gap:12px;}
.sktitle::after{content:'';flex:1;height:1px;background:var(--border);}
.skitem{margin-bottom:22px;}
.sktop{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:9px;}
.skname{font-size:14px;font-weight:500;}
.skpct{font-size:12px;font-weight:700;color:var(--gold);}
.sktrack{height:1px;background:var(--surface2);overflow:visible;position:relative;}
.skbar{height:1px;background:linear-gradient(90deg,var(--gold),var(--cream));
  width:0;transition:width 1.6s cubic-bezier(0.4,0,0.2,1);position:relative;}
.skbar::after{content:'';position:absolute;right:-4px;top:-4px;width:9px;height:9px;
  border-radius:50%;background:var(--gold);border:2px solid var(--bg);
  transition:opacity 0.3s 1.5s;opacity:0;}
.skbar.done::after{opacity:1;}
.toolrow{display:flex;align-items:center;justify-content:space-between;
  padding:12px 16px;background:var(--surface);border:1px solid var(--border);
  border-radius:5px;margin-bottom:8px;transition:all 0.3s;cursor:pointer;}
.toolrow:hover{border-color:var(--gold);background:var(--gold-glow);}
.toolname{font-size:13px;font-weight:500;}
.tooltag{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);}

/* CONTACT */
.contactsec{background:var(--surface);}
.clayout{display:grid;grid-template-columns:1fr 1.1fr;gap:72px;align-items:start;}
.cintro{font-size:15px;color:var(--text-secondary);line-height:1.9;
  font-weight:300;margin-bottom:32px;}
.clinks{display:flex;flex-direction:column;gap:9px;}
.clink{display:flex;align-items:center;gap:15px;padding:16px 20px;
  background:var(--bg);border:1px solid var(--border);border-radius:5px;
  text-decoration:none;color:var(--text-primary);transition:all 0.3s;cursor:pointer;}
.clink:hover{border-color:var(--gold);transform:translateX(5px);}
.clinkicon{width:36px;height:36px;border-radius:5px;display:flex;align-items:center;
  justify-content:center;font-size:14px;background:var(--gold-dim);flex-shrink:0;}
.clinklbl{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--text-muted);margin-bottom:2px;}
.clinkval{font-size:14px;font-weight:500;color:var(--cream);}
.clinkarro{margin-left:auto;color:var(--text-muted);font-size:13px;transition:transform 0.3s;}
.clink:hover .clinkarro{transform:translate(3px,-3px);color:var(--gold);}

.ftitle{font-family:'Fraunces',serif;font-size:24px;font-weight:700;
  letter-spacing:-0.5px;margin-bottom:24px;}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
.fg{display:flex;flex-direction:column;gap:6px;}
.flbl{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);}
.finput,.ftextarea{background:var(--bg);border:1px solid var(--border);border-radius:5px;
  padding:12px 15px;color:var(--text-primary);font-family:'Outfit',sans-serif;
  font-size:14px;outline:none;transition:all 0.3s;resize:none;}
.finput::placeholder,.ftextarea::placeholder{color:var(--text-muted);}
.finput:focus,.ftextarea:focus{border-color:var(--gold);box-shadow:0 0 0 2px rgba(196,153,58,0.08);}
.ftextarea{height:120px;}
.fsubmit{width:100%;margin-top:4px;background:var(--cream);color:#0B0B0B;border:none;
  font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;
  letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;
  padding:15px;border-radius:5px;transition:all 0.3s;}
.fsubmit:hover{background:var(--gold);transform:translateY(-2px);
  box-shadow:0 6px 28px rgba(196,153,58,0.25);}

/* TOAST */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
  background:var(--surface);border:1px solid var(--gold);border-radius:5px;
  padding:13px 22px;display:flex;align-items:center;gap:10px;z-index:9000;
  box-shadow:0 10px 44px rgba(0,0,0,0.6);animation:fadeUp 0.4s ease;font-size:14px;}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);
  backdrop-filter:blur(14px);z-index:200;display:flex;align-items:center;
  justify-content:center;padding:24px;animation:fadeIn 0.25s ease;}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:8px;
  padding:40px;max-width:620px;width:100%;max-height:82vh;overflow-y:auto;
  animation:scaleIn 0.32s cubic-bezier(0.16,1,0.3,1);position:relative;}
.mx{position:absolute;top:18px;right:18px;background:none;
  border:1px solid var(--border);color:var(--text-muted);
  width:32px;height:32px;border-radius:3px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;transition:all 0.3s;}
.mx:hover{border-color:var(--cream);color:var(--cream);}
.myr{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--gold);margin-bottom:8px;}
.mtitle{font-family:'Fraunces',serif;font-size:26px;font-weight:700;
  letter-spacing:-0.5px;margin-bottom:5px;}
.msub{font-size:13px;color:var(--text-secondary);margin-bottom:22px;font-weight:300;}
.mpoint{display:flex;gap:10px;font-size:13px;color:var(--text-secondary);
  line-height:1.8;margin-bottom:10px;font-weight:300;}
.mpoint::before{content:'→';color:var(--gold);flex-shrink:0;margin-top:1px;}

footer{background:var(--bg);border-top:1px solid var(--border);
  padding:32px 56px;display:flex;align-items:center;justify-content:space-between;}
.flogo{font-family:'Fraunces',serif;font-size:17px;font-weight:900;font-style:italic;color:var(--cream);}
.fmid{font-size:11px;color:var(--text-muted);}
.ftop{font-size:11px;color:var(--text-muted);cursor:pointer;transition:color 0.3s;}
.ftop:hover{color:var(--gold);}

@media(max-width:1024px){
  .nav,.hero,section{padding-left:24px!important;padding-right:24px!important;}
  .sklayout,.clayout{grid-template-columns:1fr;gap:36px;}
  .achgrid{grid-template-columns:1fr;}
  section{padding-top:72px;padding-bottom:72px;}
}
@media(max-width:600px){
  .hmetrics{flex-direction:column;}
  .hm{border-right:none!important;border-bottom:1px solid var(--border);}
  .hm:last-child{border-bottom:none;}
  .hactions{flex-direction:column;}
  .edugrid{grid-template-columns:1fr 1fr;}
  .fgrid{grid-template-columns:1fr;}
  .snum{display:none;}
  footer{flex-direction:column;gap:12px;text-align:center;}
}
`;

const TIMELINE_DATA = [
  {
    year: "Jun 2025 – Present",
    role: "Article Trainee",
    org: "PricewaterhouseCoopers (PwC India)",
    dept: "Transfer Pricing Practice",
    badge: "active",
    desc: "Embedded in PwC's Transfer Pricing practice, handling documentation, benchmarking, and multi-crore compliance mandates for MNCs across industries.",
    chips: ["Local File / Master File / CbCR", "FAR Analysis", "OECD TP Guidelines", "Benchmarking", "CIT(A) & ITAT", "MNC Compliance"],
    impact: "Averted ₹5 Crore taxable income enhancement via a comprehensive Show Cause Notice defense",
    extra: [
      "Prepared TP documentation (Local File, Master File, CbCR) for clients with turnovers of INR 500–15,000 crores.",
      "Conducted benchmarking analyses using Capitaline, TP Catalyst & RoyaltyStat to determine Arm's Length Pricing.",
      "Performed FAR (Functions, Assets, Risks) analyses for clients in Paints, IT, and ITeS sectors.",
      "Drafted TP submissions in response to Transfer Pricing Officer, NFAC, and CIT(A) notices.",
      "Coordinated with legal counsel for appeals before CIT(A) and Income Tax Appellate Tribunal (ITAT).",
      "Reviewed TP policies & inter-entity agreements for MNCs with ~INR 8,000 crore turnover, ensuring end-to-end compliance.",
    ]
  },
  {
    year: "Jul – Aug 2024",
    role: "Business Development Intern",
    org: "Ferns & Petals",
    dept: "Sales & Marketing",
    badge: "done",
    desc: "Two-month internship focused on consumer analytics, sales funnel optimization, and high-velocity lead conversion.",
    chips: ["Consumer Behaviour Analysis", "Sales Funnel", "Lead Generation", "Data Analytics"],
    impact: "50% personal conversion rate across 300+ leads · 15% improvement in marketing accuracy",
    extra: [
      "Analysed consumer behaviour data from 500+ respondents to identify emerging gifting trends.",
      "Delivered a 15% improvement in targeted marketing accuracy through structured data insights.",
      "Identified and approached 300+ high-potential leads, achieving a 50% conversion rate in two months.",
    ]
  },
  {
    year: "2022 – 2025",
    role: "Marketing Head",
    org: "Enkindle Minds",
    dept: "Leadership & Community",
    badge: "done",
    desc: "Led all marketing initiatives for a finance-focused student organisation, growing digital presence and organising professional events.",
    chips: ["Team Leadership", "Digital Marketing", "Event Management", "Community"],
    impact: "45% growth in digital footprint · Delivered free education at Kalyan Youth Club Foundation, Prayagraj",
    extra: [
      "Led a 5-member marketing team as Marketing Head, overseeing digital and event marketing.",
      "Organised Disha 2.0 — a professional seminar for CA aspirants, led by CA Shubham Keswani.",
      "Delivered free education at Kalyan Youth Club Foundation, Prayagraj to improve literacy in underserved areas.",
      "Executed the 'Shakshit aur Samridh Bharat' initiative for grassroots youth skill-building.",
    ]
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", lbl: "Case Competition", title: "Top 10 Finalist — DTU", desc: "Among 200+ teams at Delhi Technological University's premier finance case competition.", year: "2025" },
  { icon: "📊", lbl: "Certification", title: "NISM Research Analyst · 72.75%", desc: "Certified by NISM to conduct securities market research and financial analysis.", year: "2024" },
  { icon: "🥇", lbl: "National Olympiad", title: "Gold Medal — Maths Olympiad", desc: "Ranked first nationally in the National Mathematics Olympiad across a competitive field.", year: "2019" },
  { icon: "📰", lbl: "Scholastic", title: "School Topper — National Media Coverage", desc: "Recognised in Amar Ujala for achieving the top rank in school board examinations.", year: "2022" },
  { icon: "📈", lbl: "CUET UG 2022", title: "100 Percentile — Economics & Business", desc: "Scored 763/800 with a perfect percentile in both Economics and Business Studies among 9.68 lakh candidates.", year: "2022" },
  { icon: "⭐", lbl: "CBSE Merit", title: "Top 0.1% — 1.4 Million Candidates", desc: "Certificate of Merit in Accounts & Economics, placing in the top 0.1% of all CBSE Class XII students.", year: "2022" },
];

const SKILLS = [
  { n: "Transfer Pricing & TP Documentation", p: 90 },
  { n: "Financial Modelling & Valuation", p: 85 },
  { n: "Advanced Excel & Data Analytics", p: 88 },
  { n: "Benchmarking & FAR Analysis", p: 82 },
  { n: "Corporate & Tax Law (CA Inter)", p: 78 },
];

const TOOLS = [
  { n: "Capitaline / TP Catalyst / RoyaltyStat", t: "TP Databases" },
  { n: "Microsoft Excel (Advanced)", t: "Analytics" },
  { n: "Tally Prime", t: "Accounting" },
  { n: "Financial Modelling — Valuation School", t: "Certification" },
  { n: "MS PowerPoint & Word", t: "Reporting" },
];

function SkillBarItem({ n, p, delay = 0 }) {
  const [w, setW] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { setW(p); setTimeout(() => setDone(true), 1600 + delay); }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [p, delay]);
  return (
    <div className="skitem" ref={ref}>
      <div className="sktop"><span className="skname">{n}</span><span className="skpct">{p}%</span></div>
      <div className="sktrack">
        <div className={`skbar${done ? " done" : ""}`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

function CountUp({ end, prefix = "", suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(); const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = end / (1800 / 16); let c = 0;
        const t = setInterval(() => { c = Math.min(c + s, end); setV(Math.floor(c)); if (c >= end) clearInterval(t); }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sending, setSending] = useState(false);
  const spineRef = useRef();
  const dotRef = useRef(); const ringRef = useRef();

  useEffect(() => {
    const move = e => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
      setTimeout(() => { if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; } }, 65);
    };
    const over = e => { if (e.target.closest("button,a,.tlcard,.educard,.achrow,.toolrow,.clink,.hm")) ringRef.current?.classList.add("hov"); };
    const out = () => ringRef.current?.classList.remove("hov");
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const ids = ["home","experience","education","achievements","skills","contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const els = document.querySelectorAll(".rv,.rvl,.rvr");
      const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: 0.07, rootMargin: "0px 0px -30px 0px" });
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(t);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && spineRef.current) spineRef.current.classList.add("on"); }, { threshold: 0.1 });
    if (spineRef.current) obs.observe(spineRef.current);
    return () => obs.disconnect();
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const sendForm = e => {
    e.preventDefault(); setSending(true);
    setTimeout(() => {
      setSending(false); setForm({ name: "", email: "", msg: "" });
      setToast("Message sent — Akshat will be in touch soon.");
      setTimeout(() => setToast(null), 4000);
    }, 1600);
  };

  return (
    <div>
      <style>{CSS}</style>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className={`nav${scrolled ? " s" : ""}`}>
        <div className="logo" onClick={() => go("home")}>Akshat Gupta</div>
        <div className="nl">
          {["home","experience","education","achievements","skills"].map(s => (
            <button key={s} className={`nb${active === s ? " a" : ""}`} onClick={() => go(s)}>{s}</button>
          ))}
        </div>
        <button className="ncta" onClick={() => go("contact")}>Contact</button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hbg">
          <div className="hgrid" />
          <div className="hglow" />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760 }}>
          <div className="heyebrow"><div className="heline" /><div className="hetxt">CA Intermediate · Transfer Pricing · PwC India</div></div>
          <h1 className="hname">AKSHAT<br /><em>Gupta</em></h1>
          <div className="htrow">
            <span className="hrole">Finance Professional</span>
            <div className="hsep" />
            <span className="hco">Article Trainee @ PwC</span>
          </div>
          <p className="hdesc">Aspiring Chartered Accountant with hands-on experience in Transfer Pricing documentation, benchmarking, and multi-crore tax compliance at PwC. Driven by precision, shaped by results.</p>
          <div className="hmetrics">
            {[
              { pre: "₹", n: 5, suf: "Cr+", l: "Tax Averted" },
              { pre: "", n: 95, suf: ".8%", l: "Class XII" },
              { pre: "", n: 100, suf: "ile", l: "CUET Econ." },
              { pre: "", n: 3, suf: "/6", l: "CA Exemptions" },
            ].map((m, i) => (
              <div key={i} className="hm" onClick={() => go(i === 0 ? "experience" : "education")}>
                <div className="hmn"><CountUp end={m.n} prefix={m.pre} suffix={m.suf} /></div>
                <div className="hml">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="hactions">
            <button className="bgold" onClick={() => go("experience")}>View Timeline →</button>
            <button className="boutline" onClick={() => go("contact")}>Get in Touch</button>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: "var(--bg)" }}>
        <div className="shd rv">
          <div className="snum">01</div>
          <div className="stw">
            <div className="slbl">Career Timeline</div>
            <h2 className="stitle">Experience & <em>Roles</em></h2>
          </div>
        </div>
        <div className="tl">
          <div className="tlspine" ref={spineRef} />
          {TIMELINE_DATA.map((item, i) => (
            <div className="tli rv" key={i} style={{ transitionDelay: `${i * 0.13}s` }}>
              <div className={`tlnode${i === 0 ? " active" : ""}`} />
              <div className="tlconnect" />
              <div className="tlyear">{item.year}</div>
              <div className="tlcard" onClick={() => setModal(item)}>
                <div className="tlch">
                  <div>
                    <div className="tlrole">{item.role}</div>
                    <div className="tlorg">{item.org} · {item.dept}</div>
                  </div>
                  <div className={`tlbadge ${item.badge === "active" ? "active-b" : "done-b"}`}>
                    {item.badge === "active" ? "● Active" : "Completed"}
                  </div>
                </div>
                <p className="tldesc">{item.desc}</p>
                <div className="tlchips">{item.chips.map((c, j) => <div key={j} className="tlchip">{c}</div>)}</div>
                <div className="tlimpact">↑ {item.impact}</div>
                <button className="tlbtn" onClick={e => { e.stopPropagation(); setModal(item); }}>See full details →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ background: "var(--surface)" }}>
        <div className="shd rv">
          <div className="snum">02</div>
          <div className="stw">
            <div className="slbl">Academic Background</div>
            <h2 className="stitle">Education & <em>Qualifications</em></h2>
          </div>
        </div>
        <div className="edugrid">
          {[
            { yr: "2021–2025", deg: "B.Com. (Hons)", inst: "SGTB Khalsa College, Delhi University", score: "73.8", unit: "%", note: null },
            { yr: "2024", deg: "CA Intermediate — Both Groups", inst: "ICAI", score: "338", unit: "/600", note: "3 Exemptions Cleared" },
            { yr: "2022", deg: "CA Foundation", inst: "ICAI", score: "280", unit: "/400", note: null },
            { yr: "2022", deg: "Class XII — CBSE", inst: "Central Board of Secondary Education", score: "95.8", unit: "%", note: "Top 0.1% Nationwide" },
            { yr: "2020", deg: "Class X — CBSE", inst: "Central Board of Secondary Education", score: "91.2", unit: "%", note: null },
          ].map((e, i) => (
            <div key={i} className="educard rv" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="eduyr">{e.yr}</div>
              <div className="edudeg">{e.deg}</div>
              <div className="eduinst">{e.inst}</div>
              <div><span className="eduscore">{e.score}</span><span className="eduunit">{e.unit}</span></div>
              {e.note && <div className="edunote">{e.note}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ background: "var(--bg)" }}>
        <div className="shd rv">
          <div className="snum">03</div>
          <div className="stw">
            <div className="slbl">Recognition & Distinctions</div>
            <h2 className="stitle">Achievements & <em>Awards</em></h2>
          </div>
        </div>
        <div className="achgrid">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="achrow rv" style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={() => setModal({ type: "ach", ...a })}>
              <div className="achibox">{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="achlbl">{a.lbl}</div>
                <div className="achtit">{a.title}</div>
                <div className="achdesc">{a.desc}</div>
              </div>
              <div className="achyr">{a.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "var(--surface)" }}>
        <div className="shd rv">
          <div className="snum">04</div>
          <div className="stw">
            <div className="slbl">Capabilities</div>
            <h2 className="stitle">Skills & <em>Expertise</em></h2>
          </div>
        </div>
        <div className="sklayout">
          <div className="rvl">
            <div className="sktitle">Core Competencies</div>
            {SKILLS.map((s, i) => <SkillBarItem key={i} n={s.n} p={s.p} delay={i * 110} />)}
          </div>
          <div className="rvr">
            <div className="sktitle">Tools & Certifications</div>
            <div className="toolrow-wrap">
              {TOOLS.map((t, i) => (
                <div key={i} className="toolrow">
                  <span className="toolname">{t.n}</span>
                  <span className="tooltag">{t.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contactsec">
        <div className="shd rv">
          <div className="snum">05</div>
          <div className="stw">
            <div className="slbl">Get In Touch</div>
            <h2 className="stitle">Let's <em>Connect</em></h2>
          </div>
        </div>
        <div className="clayout">
          <div className="rvl">
            <p className="cintro">Open to conversations around CA articleship, transfer pricing, financial analysis, and career opportunities in the finance space. Based in Prayagraj, open to relocation.</p>
            <div className="clinks">
              {[
                { icon: "✉", lbl: "Email", val: "guptaakshat245@gmail.com", href: "mailto:guptaakshat245@gmail.com" },
                { icon: "📱", lbl: "Phone", val: "+91 82997 17498", href: "tel:+918299717498" },
                { icon: "in", lbl: "LinkedIn", val: "Connect on LinkedIn", href: "https://www.linkedin.com/in/akshatgupta-ca" },
                { icon: "📍", lbl: "Location", val: "Prayagraj, Uttar Pradesh", href: null },
              ].map((c, i) => (
                <div key={i} className="clink" onClick={() => c.href && window.open(c.href)}>
                  <div className="clinkicon">{c.icon}</div>
                  <div>
                    <div className="clinklbl">{c.lbl}</div>
                    <div className="clinkval">{c.val}</div>
                  </div>
                  {c.href && <div className="clinkarro">↗</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="rvr">
            <div className="ftitle">Send a Message</div>
            <form onSubmit={sendForm}>
              <div className="fgrid">
                <div className="fg">
                  <label className="flbl">Name</label>
                  <input className="finput" placeholder="Your name" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="fg">
                  <label className="flbl">Email</label>
                  <input className="finput" type="email" placeholder="your@email.com" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="fg" style={{ marginBottom: 12 }}>
                <label className="flbl">Message</label>
                <textarea className="ftextarea" placeholder="Hi Akshat, I'd like to connect about..." required
                  value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} />
              </div>
              <button className="fsubmit" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="flogo">Akshat Gupta</div>
        <div className="fmid">© 2025 · CA Intermediate · PwC Transfer Pricing · Prayagraj</div>
        <div className="ftop" onClick={() => go("home")}>Back to top ↑</div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="mx" onClick={() => setModal(null)}>✕</button>
            {modal.type === "ach" ? (
              <>
                <div style={{ fontSize: 38, marginBottom: 14 }}>{modal.icon}</div>
                <div className="myr">{modal.lbl} · {modal.year}</div>
                <div className="mtitle">{modal.title}</div>
                <div className="msub">{modal.desc}</div>
              </>
            ) : (
              <>
                <div className="myr">{modal.year}</div>
                <div className="mtitle">{modal.role}</div>
                <div className="msub">{modal.org} · {modal.dept}</div>
                {modal.extra?.map((p, i) => <div key={i} className="mpoint">{p}</div>)}
                <div className="tlimpact" style={{ marginTop: 18 }}>↑ {modal.impact}</div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <span style={{ color: "var(--gold)" }}>✓</span>
          <span>{toast}</span>
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", marginLeft: 8 }}>✕</button>
        </div>
      )}
    </div>
  );
}