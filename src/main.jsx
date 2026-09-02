import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    id:"daev", animal:"shoebill", animalLabel:"peer reviewer",
    eyebrow:"BACHELOR THESIS · MEDICAL AI",
    title:"Detect–Adapt–Explain–Verify",
    copy:"When a model adapts to a new hospital, does it only get more accurate — or does its reasoning stay trustworthy too?",
    tech:["PyTorch","ResNet18","DenseNet121","TENT","EATA","Grad-CAM"],
    flow:["NIH CXR","real shift","VinDr-CXR","adapt","explain","verify"],
    result:"TENT cut ResNet18 false positives from 618 → 354 while improving F1 from 0.239 → 0.345.",
    note:"Better predictions don't automatically mean trustworthy adaptation.",
    detail:{
      problem:"Medical imaging models often degrade when moved across hospitals, scanners or patient populations. AUROC alone can hide threshold failure, calibration drift and explanation instability.",
      built:"A four-phase framework that detects distribution shift, applies test-time adaptation, compares Grad-CAM behaviour, and finally passes models through a multi-constraint deployment gate.",
      accent:"research",
    }
  },
  {
    id:"rag", animal:"raccoon", animalLabel:"retrieval algorithm",
    eyebrow:"GENERATIVE AI · ENTERPRISE",
    title:"Enterprise RAG Assistant",
    copy:"Important answers were buried across internal documentation. I helped turn that knowledge into something teams could actually ask.",
    tech:["LangChain","OpenAI APIs","Databricks","Salesforce","Apex","LWC"],
    flow:["docs","chunk","retrieve","LLM","answer","Salesforce"],
    result:"Integrated directly into Salesforce so support knowledge could be surfaced inside the workflow.",
    note:"The raccoon has read the documentation. Allegedly.",
    detail:{
      problem:"Support and product knowledge lived across structured and unstructured sources, making grounded answers slow to retrieve and hard to keep consistent.",
      built:"Retrieval pipelines, experimentation and enterprise integration for an internal LLM/RAG assistant, including Salesforce UI and REST-backed workflows.",
      accent:"systems",
    }
  },
  {
    id:"pipeline", animal:"pangolin", animalLabel:"infrastructure",
    eyebrow:"AUTOMATION · AI INFRASTRUCTURE",
    title:"Automated Knowledge Pipeline",
    copy:"The chatbot was only as reliable as what fed it, so I automated the boring-but-critical document work underneath it.",
    tech:["Power Automate","SharePoint","Data cleaning","Workflow automation"],
    flow:["files","fetch","clean","structure","knowledge","RAG"],
    result:"Turned scattered document handling into a repeatable knowledge-source workflow.",
    note:"Invisible work is still work.",
    detail:{
      problem:"Document collection and preparation was manual, inconsistent and fragile — exactly the kind of upstream mess that quietly ruins downstream AI quality.",
      built:"A Power Automate + SharePoint workflow that collected documents, cleaned structure and prepared a stable source for the internal assistant.",
      accent:"infra",
    }
  },
  {
    id:"asl", animal:"axolotl", animalLabel:"gesture decoder",
    eyebrow:"COMPUTER VISION · ROBOTICS",
    title:"ASL Command Robot",
    copy:"A wheeled robot that watches American Sign Language hand gestures and turns them into movement commands in real time.",
    tech:["YOLO","Computer Vision","Python","Robot control","ML"],
    flow:["hand","camera","detect","classify","command","move"],
    result:"Connected real-time gesture recognition to robot navigation logic across multiple command sequences.",
    note:"No keyboard. Just hands and a slightly overconfident robot.",
    detail:{
      problem:"Human–robot interaction usually depends on buttons, joysticks or voice. I wanted to test whether visual sign commands could become a direct control interface.",
      built:"A YOLO-based recognition pipeline for ASL gestures, connected to command logic for a wheeled robot.",
      accent:"vision",
    }
  },
  {
    id:"llmano", animal:"fennec", animalLabel:"risk department",
    eyebrow:"RESPONSIBLE AI · GOVERNANCE",
    title:"LLM Governance & Evaluation",
    copy:"A decision framework for the awkward part of enterprise AI: choosing between capability, privacy, latency, cost and compliance.",
    tech:["LLMs","GDPR","Privacy","Evaluation","Decision modelling"],
    flow:["models","cost","latency","privacy","risk","decision"],
    result:"Compared local and cloud model options using deployment-focused evaluation criteria.",
    note:"Fast, cheap, private, perfect. Pick... realistically not all four.",
    detail:{
      problem:"Model selection in enterprise settings is not only a benchmark problem. Privacy, compliance, cost, deployment constraints and answer quality collide.",
      built:"A structured evaluation framework comparing deployment trade-offs across model families and operational constraints.",
      accent:"governance",
    }
  },
  {
    id:"cloud", animal:"manedwolf", animalLabel:"scheduler",
    eyebrow:"RESEARCH · OPTIMISATION",
    title:"Adaptive Cloud Resource Allocation",
    copy:"A proof-of-concept exploring how learning and constraint-solving methods can allocate cloud resources without setting money on fire.",
    tech:["Reinforcement Learning","Optimisation","SMT Solvers","Cloud"],
    flow:["demand","state","policy","constraints","allocate","evaluate"],
    result:"Evaluated performance, cost and adaptability trade-offs across simulated allocation strategies.",
    note:"The cloud is just someone else's computer with a bill attached.",
    detail:{
      problem:"Static allocation wastes capacity while overly reactive policies can destabilise systems or violate constraints.",
      built:"A research prototype combining learning-oriented allocation ideas with optimisation and constraint-solving approaches.",
      accent:"optimisation",
    }
  },
];

const experience = [
  {
    company:"Danfoss GmbH · Hamburg",
    role:"AI Technology Intern — Product Development",
    date:"SEP 2024 → SEP 2025",
    bullets:[
      "Helped build an internal LLM/RAG assistant for enterprise support workflows.",
      "Built retrieval pipelines across structured and unstructured enterprise data.",
      "Integrated AI workflows into Salesforce with Apex, LWC and REST APIs.",
      "Prepared datasets and ran experiments around retrieval quality and grounding."
    ]
  },
  {
    company:"Danfoss GmbH · Hamburg",
    role:"Working Student — Product Management",
    date:"OCT 2025 → JAN 2026",
    bullets:[
      "Built Power Automate workflows to reduce manual document handling.",
      "Automated document collection feeding downstream AI systems.",
      "Supported product specifications, prioritisation and cross-team delivery.",
      "Worked across engineering, product and business rather than hiding in one lane."
    ]
  }
];

function useReveal(){
  useEffect(()=>{
    const nodes=[...document.querySelectorAll("[data-reveal]")];
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -6% 0px"});
    nodes.forEach(n=>obs.observe(n));
    return()=>obs.disconnect();
  },[]);
}

function Animal({type, className=""}){
  const common={className:`animal ${className}`, viewBox:"0 0 160 120", fill:"none", xmlns:"http://www.w3.org/2000/svg", "aria-hidden":"true"};
  if(type==="capybara") return <svg {...common}>
    <path d="M31 77c-9-11-8-30 3-42 12-13 37-15 59-10 19 4 33 16 36 33 2 13-2 28-13 36-12 9-30 11-48 8-17-2-29-11-37-25Z" fill="var(--ochre2)" stroke="currentColor" strokeWidth="3"/>
    <path d="M113 36c9-10 22-10 28-1 6 9 3 24-7 30-8 5-18 3-25-3" fill="var(--ochre2)" stroke="currentColor" strokeWidth="3"/>
    <circle cx="128" cy="42" r="3" fill="currentColor"/><circle cx="81" cy="48" r="3" fill="currentColor"/>
    <path d="M38 91v18M63 98v13M103 96v14M124 87v20" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <path d="M124 52c5 3 10 3 14 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
  if(type==="shoebill") return <svg {...common}>
    <path d="M72 20c17-2 29 10 28 27-1 14-7 23-5 38l5 23M78 46 50 53l28 10" fill="var(--blue2)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M82 61c-8 14-13 27-12 46M92 85l20 20M72 107l-16 5M100 108l14 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="87" cy="36" r="3" fill="currentColor"/>
  </svg>;
  if(type==="raccoon") return <svg {...common}>
    <path d="M31 74c-2-23 14-43 40-48 29-6 55 8 59 33 4 22-11 41-36 47-31 7-60-5-63-32Z" fill="var(--sage2)" stroke="currentColor" strokeWidth="3"/>
    <path d="M47 38 33 17l28 13M104 31l21-15-5 26" fill="var(--sage2)" stroke="currentColor" strokeWidth="3"/>
    <path d="M54 49c16-13 38-15 55-4l-9 27c-13 8-30 8-43 0l-3-23Z" fill="var(--ink)" opacity=".86"/>
    <circle cx="67" cy="58" r="4" fill="var(--paper)"/><circle cx="94" cy="56" r="4" fill="var(--paper)"/>
    <path d="M78 70h8l-4 5-4-5Z" fill="var(--paper)"/>
  </svg>;
  if(type==="pangolin") return <svg {...common}>
    <path d="M28 70c8-35 47-55 78-39 24 13 27 43 7 61-19 18-58 17-85-22Z" fill="var(--rose2)" stroke="currentColor" strokeWidth="3"/>
    {[0,1,2,3,4].map(i=><path key={i} d={`M${47+i*12} ${47-i%2*4}q12 10 0 22q-12-10 0-22Z`} stroke="currentColor" strokeWidth="2" opacity=".75"/>)}
    <path d="M110 43c17-2 30 3 38 13-12 2-22 8-30 17M28 70c-11 5-17 14-18 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="127" cy="52" r="2.5" fill="currentColor"/>
  </svg>;
  if(type==="axolotl") return <svg {...common}>
    <path d="M36 63c4-19 21-31 43-29 24 1 42 17 43 38 1 18-15 33-38 34-27 1-52-17-48-43Z" fill="var(--pink2)" stroke="currentColor" strokeWidth="3"/>
    <path d="M44 48 27 33M42 59 19 55M43 72 24 86M111 49l17-17M116 62l22-3M113 75l19 13" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    <circle cx="68" cy="61" r="3" fill="currentColor"/><circle cx="92" cy="60" r="3" fill="currentColor"/>
    <path d="M74 73q8 7 16 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
  if(type==="fennec") return <svg {...common}>
    <path d="M48 64c4-22 20-34 39-32 21 2 34 20 31 41-3 20-20 34-41 32-22-2-33-19-29-41Z" fill="var(--sand2)" stroke="currentColor" strokeWidth="3"/>
    <path d="M57 43 44 7c18 4 28 16 32 30M100 39 119 9c9 18 7 34-3 47" fill="var(--sand2)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="69" cy="62" r="3" fill="currentColor"/><circle cx="94" cy="61" r="3" fill="currentColor"/>
    <path d="M79 73h7l-3.5 4-3.5-4ZM53 93 43 109M104 94l10 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
  return <svg {...common}>
    <path d="M46 74c-2-24 13-43 35-47 23-4 43 11 47 35 3 17-5 31-20 39-18 10-39 7-51-5-7-7-11-14-11-22Z" fill="var(--lav2)" stroke="currentColor" strokeWidth="3"/>
    <path d="M83 28 64 7M96 30l13-23M45 74 19 89M118 78l28 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="73" cy="59" r="3" fill="currentColor"/><circle cx="99" cy="57" r="3" fill="currentColor"/>
    <path d="M81 72q8 5 15-1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
}

function Pipeline({steps}){
  return <div className="pipeline" aria-label={steps.join(" to ")}>
    {steps.map((s,i)=><React.Fragment key={s}>
      <span className="pipe-step" style={{"--i":i}}>{s}</span>
      {i<steps.length-1 && <span className="pipe-arrow">→</span>}
    </React.Fragment>)}
  </div>
}

function MetricGraph(){
  return <div className="metric-graph">
    <div className="metric-head"><span>ResNet18 · VinDr</span><span>ERM → TENT</span></div>
    <div className="bar-row"><span>F1</span><div className="bars"><i style={{width:"48%"}}></i><b style={{width:"69%"}}></b></div><em>.239 → .345</em></div>
    <div className="bar-row"><span>FP</span><div className="bars reverse"><i style={{width:"82%"}}></i><b style={{width:"47%"}}></b></div><em>618 → 354</em></div>
    <div className="legend"><span><i></i>ERM</span><span><b></b>TENT</span></div>
  </div>
}

function ProjectCard({p,index,onOpen}){
  return <article className={`project-card project-${p.id}`} data-reveal style={{"--delay":`${index*55}ms`}}>
    <div className="project-top">
      <div>
        <p className="eyebrow">{p.eyebrow}</p>
        <h3>{p.title}</h3>
      </div>
      <div className="animal-tag">
        <Animal type={p.animal}/>
        <span>{p.animalLabel}</span>
      </div>
    </div>
    <p className="project-copy">{p.copy}</p>
    {p.id==="daev" ? <MetricGraph/> : <Pipeline steps={p.flow}/>}
    <div className="chips">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
    <p className="result">{p.result}</p>
    <div className="project-bottom">
      <button onClick={()=>onOpen(p)}>open case study <span>↗</span></button>
      <small>{p.note}</small>
    </div>
  </article>
}

function App(){
  const [open,setOpen]=useState(null);
  const [clicks,setClicks]=useState(0);
  const [menu,setMenu]=useState(false);
  useReveal();

  useEffect(()=>{
    const onKey=e=>{ if(e.key==="Escape") setOpen(null); };
    addEventListener("keydown",onKey); return()=>removeEventListener("keydown",onKey);
  },[]);

  return <div className="site">
    <header>
      <a className="brand" href="#top">AZBA.</a>
      <nav className={menu?"open":""}>
        <a href="#about" onClick={()=>setMenu(false)}>about</a>
        <a href="#projects" onClick={()=>setMenu(false)}>projects</a>
        <a href="#experience" onClick={()=>setMenu(false)}>experience</a>
        <a href="#skills" onClick={()=>setMenu(false)}>skills</a>
      </nav>
      <a className="github" href="https://github.com/Azbaengineer" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      <button className="menu" onClick={()=>setMenu(v=>!v)} aria-label="menu">☰</button>
    </header>

    <main>
      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="kicker">AI · DATA · PRODUCT — GERMANY</p>
          <h1>Hi, I’m Azba.</h1>
          <h2>I build AI systems, research weird failure modes, and occasionally make robots understand hand signs.</h2>
          <div className="hero-actions">
            <a className="button dark" href="#projects">see my work ↓</a>
            <a className="button light" href="https://github.com/Azbaengineer" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div className="hero-creature">
          <button onClick={()=>setClicks(c=>c+1)} className="capy-button" aria-label="Click the capybara">
            <Animal type="capybara"/>
          </button>
          <span className="scribble">technical supervisor</span>
          {clicks>=5 && <span className="easter">productivity increased by 0%</span>}
        </div>
        <div className="scroll-hint">scroll and things wake up ↓</div>
      </section>

      <section id="about" className="section about">
        <div data-reveal>
          <p className="kicker">01 · ABOUT</p>
          <h2>A little about me.</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p>I studied <strong>Artificial Intelligence</strong> at TH Deggendorf and spent my thesis staring at chest X-rays, asking whether a model that gets better under distribution shift also stays trustworthy.</p>
            <p>At <strong>Danfoss</strong>, I worked on the much messier end of AI: retrieval pipelines, internal LLM assistants, Salesforce integration, automation and the small engineering decisions that decide whether something is actually usable.</p>
            <p>I’m happiest somewhere between <strong>research, AI products and implementation</strong> — rigorous enough to test what can go wrong, practical enough to ship something people can use.</p>
          </div>
          <aside className="currently" data-reveal>
            <span className="scribble">currently</span>
            <ul>
              <li><b>📍</b> Germany</li>
              <li><b>🧠</b> thinking about responsible AI products</li>
              <li><b>🔧</b> building a portfolio that refuses to be beige SaaS</li>
              <li><b>🌱</b> learning German + whatever broke yesterday</li>
              <li><b>☕</b> powered by questionable amounts of caffeine</li>
            </ul>
            <Animal type="fennec" className="aside-animal"/>
          </aside>
        </div>
      </section>

      <section id="projects" className="section projects">
        <div className="section-title" data-reveal>
          <p className="kicker">02 · PROJECTS</p>
          <h2>Things I actually built.</h2>
          <p>Not six fake startups. Research, enterprise AI, automation, robotics and experiments that survived debugging.</p>
        </div>
        <div className="project-grid">
          {projects.map((p,i)=><ProjectCard key={p.id} p={p} index={i} onOpen={setOpen}/>)}
        </div>
      </section>

      <section id="experience" className="section experience">
        <div data-reveal>
          <p className="kicker">03 · EXPERIENCE</p>
          <h2>Where the theory met Jira.</h2>
        </div>
        <div className="timeline">
          <div className="timeline-track"><Animal type="pangolin"/></div>
          {experience.map((e,i)=><article key={e.role} data-reveal>
            <span className="dot"></span>
            <p className="eyebrow">{e.date}</p>
            <h3>{e.company}</h3>
            <h4>{e.role}</h4>
            <ul>{e.bullets.map(b=><li key={b}>{b}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section id="skills" className="section skills">
        <div data-reveal>
          <p className="kicker">04 · TOOLBOX</p>
          <h2>Things I can be dangerous with.</h2>
        </div>
        <div className="skill-grid">
          {[
            ["AI / ML","Python · PyTorch · scikit-learn · Computer Vision · NLP · XAI · Domain Adaptation"],
            ["GenAI","RAG · LangChain · OpenAI APIs · Prompting · Evaluation · Databricks"],
            ["Enterprise","Salesforce · Apex · LWC · REST APIs · Power Automate · SharePoint"],
            ["Product","Requirements · Prioritisation · Stakeholder comms · Experimentation · Technical documentation"]
          ].map(([a,b],i)=><article key={a} data-reveal style={{"--delay":`${i*70}ms`}}><span>{String(i+1).padStart(2,"0")}</span><h3>{a}</h3><p>{b}</p></article>)}
        </div>
      </section>

      <section className="contact section" data-reveal>
        <Animal type="axolotl"/>
        <p className="kicker">05 · CONTACT</p>
        <h2>Want to build something useful?</h2>
        <p>AI systems, product work, research, or a robot with unnecessary personality.</p>
        <div className="hero-actions">
          <a className="button dark" href="mailto:azbabanu001@gmail.com">email me ↗</a>
          <a className="button light" href="https://www.linkedin.com/in/azbabanu-e-a855b9289/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </section>
    </main>

    <footer><span>AZBA © 2026</span><span>built with code, caffeine & suspiciously many animals</span></footer>

    {open && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(null)}}>
      <div className={`modal accent-${open.detail.accent}`}>
        <button className="close" onClick={()=>setOpen(null)}>×</button>
        <div className="modal-animal"><Animal type={open.animal}/><span className="scribble">{open.animalLabel}</span></div>
        <p className="eyebrow">{open.eyebrow}</p>
        <h2>{open.title}</h2>
        <div className="modal-grid">
          <div><h4>the problem</h4><p>{open.detail.problem}</p></div>
          <div><h4>what I built</h4><p>{open.detail.built}</p></div>
        </div>
        <h4>the pipeline</h4>
        <Pipeline steps={open.flow}/>
        <div className="modal-result"><span>result</span>{open.result}</div>
        <div className="chips">{open.tech.map(t=><span key={t}>{t}</span>)}</div>
        <blockquote>“{open.note}”</blockquote>
      </div>
    </div>}
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);