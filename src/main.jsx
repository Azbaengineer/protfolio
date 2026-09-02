import React, {useEffect, useMemo, useState} from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    id:"daev", animal:"shoebill", animalLabel:"peer reviewer", visual:"daev",
    eyebrow:"BACHELOR THESIS · MEDICAL AI", title:"Detect–Adapt–Explain–Verify",
    summary:"A medical-AI framework for testing whether models stay reliable when moved from one hospital dataset to another.",
    tech:["PyTorch","TENT","Grad-CAM","Medical AI"],
    result:"F1 0.239 → 0.345 · false positives 618 → 354",
    note:"Better predictions don't automatically mean trustworthy adaptation.",
    flow:["NIH","shift","VinDr","adapt","explain","verify"],
    detail:{
      intro:"My thesis asked a deployment question normal benchmark scores often miss: when a model adapts to a new clinical environment, does it only predict better — or does it stay calibrated, explainable and operationally safe?",
      problem:"Chest X-ray classifiers can look strong on their source dataset and then behave very differently on a new hospital dataset because scanners, prevalence and patient populations change. AUROC alone can hide threshold failure, calibration drift and explanation instability.",
      role:"I designed the full D-A-E-V evaluation framework, trained the source models, implemented test-time adaptation, built the explainability analysis and defined the verification logic.",
      approach:["Train ResNet18 and DenseNet121 on NIH ChestX-ray14.","Transfer frozen models to VinDr-CXR to expose real distribution-shift failure.","Apply BN recalibration, TENT and EATA without target labels.","Compare Grad-CAM behaviour before and after adaptation.","Verify candidate models using operational, calibration and reliability constraints."],
      challenge:"The interesting failure was a performance paradox: ranking quality could improve while the fixed deployment threshold still produced bad operational behaviour. A single metric was not enough to decide whether adaptation was useful.",
      results:["ResNet18 AUROC improved from 0.920 to 0.933 under TENT.","F1 improved from 0.239 to 0.345.","False positives dropped from 618 to 354.","Explanation analysis showed predictive improvement and explanation faithfulness can move independently."],
      learning:"Deployment safety is not a leaderboard number. Behaviour, calibration and explanations need to be evaluated together."
    }
  },
  {
    id:"rag", animal:"raccoon", animalLabel:"retrieval algorithm", visual:"rag",
    eyebrow:"GENERATIVE AI · ENTERPRISE", title:"Enterprise RAG Assistant",
    summary:"An internal AI assistant that retrieves product knowledge and surfaces grounded answers directly inside enterprise workflows.",
    tech:["LangChain","OpenAI APIs","Salesforce","RAG"],
    result:"Grounded knowledge retrieval embedded directly in Salesforce.",
    note:"The raccoon has read the documentation. Allegedly.",
    flow:["docs","retrieve","context","LLM","answer","Salesforce"],
    detail:{
      intro:"This was less about building a flashy chatbot and more about making enterprise knowledge usable where people already worked.",
      problem:"Important technical and product information was distributed across structured and unstructured sources. Finding the right answer was slow, while generic LLM output was not reliable enough for internal support workflows.",
      role:"I helped develop the assistant, built retrieval flows, prepared knowledge sources, supported evaluation and integrated the experience into Salesforce.",
      approach:["Prepare and structure internal documentation for retrieval.","Retrieve relevant context from enterprise sources.","Generate grounded answers using retrieved context.","Expose the assistant through Salesforce using Apex, LWC and REST APIs.","Keep escalation and existing support workflows in the loop."],
      challenge:"The difficult part was not calling an LLM API. It was retrieval quality, messy enterprise data, grounding and making the assistant fit a real support workflow.",
      results:["Built retrieval flows across structured and unstructured enterprise data.","Integrated the assistant directly into Salesforce.","Supported internal product and technical knowledge use cases.","Connected downstream automation to a cleaner knowledge source."],
      learning:"Enterprise GenAI is systems work: data, retrieval, permissions, integration and UX matter as much as the model."
    }
  },
  {
    id:"pipeline", animal:"pangolin", animalLabel:"infrastructure", visual:"pipeline",
    eyebrow:"AUTOMATION · AI INFRASTRUCTURE", title:"Automated Knowledge Pipeline",
    summary:"A Power Automate + SharePoint workflow that turns scattered documents into a cleaner, repeatable knowledge source for an internal chatbot.",
    tech:["Power Automate","SharePoint","Automation","Data"],
    result:"Less manual knowledge-source preparation for downstream RAG.",
    note:"Invisible work is still work.",
    flow:["files","fetch","clean","structure","knowledge","RAG"],
    detail:{
      intro:"The assistant could only be as reliable as the documents feeding it, so I worked on the less glamorous layer underneath: keeping that knowledge source clean and repeatable.",
      problem:"Manual document collection creates stale, inconsistent and badly structured input. For a RAG system, that quietly turns into retrieval problems later.",
      role:"I designed workflow automation for fetching, organising and preparing documents used by the internal assistant.",
      approach:["Monitor selected SharePoint locations.","Fetch relevant files automatically through Power Automate.","Apply repeatable structural rules.","Prepare cleaner source data for retrieval.","Reduce repeated manual handling when knowledge changes."],
      challenge:"Automation has to be boring in the best way: predictable, maintainable and resilient to messy real-world document structure.",
      results:["Created a repeatable document-ingestion workflow.","Improved consistency of the source feeding the internal chatbot.","Reduced reliance on ad-hoc manual collection.","Connected product needs with practical AI infrastructure."],
      learning:"A lot of AI quality problems start before the model ever sees the data."
    }
  },
  {
    id:"asl", animal:"axolotl", animalLabel:"gesture decoder", visual:"asl",
    eyebrow:"COMPUTER VISION · ROBOTICS", title:"ASL Command Robot",
    summary:"A wheeled robot that recognises American Sign Language hand gestures and converts them into navigation commands.",
    tech:["YOLO","Computer Vision","Python","Robotics"],
    result:"Real-time gesture recognition connected to robot-control logic.",
    note:"No keyboard. Just hands and a slightly overconfident robot.",
    flow:["hand","camera","YOLO","command","control","move"],
    detail:{
      intro:"I wanted to turn visual language into a direct human–robot interface instead of relying on buttons, voice or a traditional controller.",
      problem:"The system had to detect gestures from a live camera feed, classify them reliably and translate them into movement commands quickly enough to control a wheeled robot.",
      role:"I developed the vision pipeline, trained the gesture-recognition model and connected predictions to robot-control logic.",
      approach:["Prepare gesture images for model training.","Train a YOLO-based recognition model for ASL commands.","Run inference on live camera frames.","Map recognised gestures to robot actions.","Test command sequences and tune behaviour."],
      challenge:"Recognition accuracy alone was not enough. Small prediction errors become physical behaviour once a model controls a robot, so command mapping needed to be conservative and predictable.",
      results:["Built a real-time ASL gesture-recognition pipeline.","Connected visual predictions to wheeled-robot navigation.","Validated multiple gesture-driven command sequences.","Combined ML, computer vision and physical control in one system."],
      learning:"Robotics makes model mistakes very tangible — software confidence suddenly has wheels."
    }
  },
  {
    id:"llmano", animal:"fennec", animalLabel:"risk department", visual:"llmano",
    eyebrow:"RESPONSIBLE AI · GOVERNANCE", title:"LLM Governance & Evaluation",
    summary:"A decision framework for comparing enterprise LLM options across capability, privacy, compliance, latency and cost.",
    tech:["LLMs","GDPR","Evaluation","Governance"],
    result:"Structured cloud-vs-local model decisions around deployment constraints.",
    note:"Fast, cheap, private, perfect. Pick... realistically not all four.",
    flow:["models","quality","privacy","cost","risk","decision"],
    detail:{
      intro:"The best model on a benchmark is not automatically the best model for an organisation. This project focused on the trade-offs that appear once AI meets deployment constraints.",
      problem:"Cloud and local LLM choices have different implications for privacy, compliance, latency, infrastructure cost and capability. A technical score alone cannot capture that decision.",
      role:"I designed the comparison framework and evaluated model/deployment choices using operational and governance criteria.",
      approach:["Define dimensions: quality, privacy, cost, latency and compliance.","Compare local and cloud model families.","Include legal and operational feasibility in evaluation.","Score trade-offs instead of searching for one universal winner.","Translate the analysis into an enterprise decision framework."],
      challenge:"Many AI decisions are multi-objective. Improving one dimension can worsen another, so the framework needed to make trade-offs visible rather than hide them.",
      results:["Compared multiple model families across deployment criteria.","Included GDPR/privacy requirements in technical model selection.","Created evaluation dimensions for quality and legal feasibility.","Turned model selection into a structured decision problem."],
      learning:"Responsible AI gets useful when governance becomes part of engineering instead of a checklist added at the end."
    }
  },
  {
    id:"cloud", animal:"manedwolf", animalLabel:"scheduler", visual:"cloud",
    eyebrow:"RESEARCH · OPTIMISATION", title:"Adaptive Cloud Resource Allocation",
    summary:"A research prototype exploring learning and constraint-solving approaches for allocating cloud resources under changing demand.",
    tech:["Reinforcement Learning","SMT","Optimisation","Cloud"],
    result:"Compared cost, performance and adaptability across allocation strategies.",
    note:"The cloud is just someone else's computer with a bill attached.",
    flow:["demand","state","policy","constraints","allocate","evaluate"],
    detail:{
      intro:"This project explored how cloud resources could be allocated more intelligently when demand changes instead of relying only on static rules.",
      problem:"Over-provisioning wastes money, under-provisioning hurts performance, and aggressive adaptive strategies can violate operational constraints.",
      role:"I investigated and prototyped allocation strategies using learning-oriented methods, perceptrons and SMT-based constraint solving.",
      approach:["Model resource demand and allocation decisions.","Explore learning-based adaptive strategies.","Represent hard allocation constraints with SMT solving.","Simulate alternative allocation policies.","Compare cost, performance and adaptability trade-offs."],
      challenge:"The central tension was flexibility versus guarantees: a strategy can adapt quickly but still needs to respect hard operational constraints.",
      results:["Built a proof-of-concept adaptive allocation model.","Compared multiple allocation strategies in simulation.","Evaluated the relationship between resource cost and performance.","Explored how optimisation and learning can complement each other."],
      learning:"Not every problem should be solved by one model. Sometimes learning plus explicit constraints is the more sensible system."
    }
  }
];

const experience = [
  {
    company:"Danfoss GmbH · Hamburg",
    role:"AI Technology Intern — Product Development (ECS-D)",
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
    role:"Working Student — Product Management (ECS-P)",
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

function ProjectVisual({type}){
  if(type==="daev") return <div className="visual visual-daev">
    <div className="hospital source"><span>NIH</span><i></i><small>source</small></div>
    <div className="shift-arrow">distribution shift →</div>
    <div className="hospital target"><span>VinDr</span><i></i><small>target</small></div>
    <div className="daev-phases"><b>D</b><em>→</em><b>A</b><em>→</em><b>E</b><em>→</em><b>V</b></div>
  </div>;
  if(type==="rag") return <div className="visual visual-rag">
    <div className="doc-stack"><i></i><i></i><i></i></div><div className="beam">······→</div><div className="rag-core">RAG</div><div className="beam">→······</div><div className="answer-card">grounded<br/>answer</div>
  </div>;
  if(type==="pipeline") return <div className="visual visual-pipeline">
    <div className="source-box">SharePoint<small>docs</small></div><div className="pipe-line">→→→</div><div className="gear-box">⚙</div><div className="pipe-line">→→→</div><div className="db-box">clean<small>knowledge</small></div>
  </div>;
  if(type==="asl") return <div className="visual visual-asl">
    <div className="hand-sign">✋</div><div className="camera-box"><i></i><span>YOLO</span></div><div className="command-box">TURN<br/><b>RIGHT →</b></div><div className="tiny-robot">▰<i>◉</i><i>◉</i></div>
  </div>;
  if(type==="llmano") return <div className="visual visual-llm">
    <div className="radar"><i></i><b></b></div><span className="r1">privacy</span><span className="r2">quality</span><span className="r3">cost</span><span className="r4">latency</span><span className="r5">GDPR</span>
  </div>;
  return <div className="visual visual-cloud"><div className="cloud-icon">☁</div><div className="usage-bars"><i></i><i></i><i></i><i></i></div><div className="policy-box">adaptive<br/><b>policy ↕</b></div></div>;
}

function ProjectCard({p,index,onOpen}){
  return <article className={`project-card project-${p.id}`} data-reveal style={{"--delay":`${index*55}ms`}}>
    <div className="project-top"><div><p className="eyebrow">{p.eyebrow}</p><h3>{p.title}</h3></div><div className="animal-tag"><Animal type={p.animal}/><span>{p.animalLabel}</span></div></div>
    <p className="project-summary">{p.summary}</p>
    <ProjectVisual type={p.visual}/>
    <div className="chips compact">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
    <div className="card-outcome"><span>OUTCOME</span><p>{p.result}</p></div>
    <button className="case-button" onClick={()=>onOpen(p)}>explore case study <span>↗</span></button>
  </article>
}

function CaseStudy({p,onClose}){
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <article className={`case-study case-${p.id}`}>
      <button className="close" onClick={onClose}>×</button>
      <div className="case-hero">
        <div><p className="eyebrow">{p.eyebrow}</p><h2>{p.title}</h2><p className="case-intro">{p.detail.intro}</p></div>
        <div className="case-mascot"><Animal type={p.animal}/><span className="scribble">{p.animalLabel}</span></div>
      </div>
      <ProjectVisual type={p.visual}/>
      <section className="case-grid two"><div><span className="case-number">01</span><h3>The problem</h3><p>{p.detail.problem}</p></div><div><span className="case-number">02</span><h3>My role</h3><p>{p.detail.role}</p></div></section>
      <section className="case-section"><div className="case-heading"><span className="case-number">03</span><h3>How I approached it</h3></div><div className="approach-list">{p.detail.approach.map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><p>{x}</p></div>)}</div></section>
      <section className="case-grid two"><div><span className="case-number">04</span><h3>The interesting bit</h3><p>{p.detail.challenge}</p></div><div className="results-panel"><span className="case-number">05</span><h3>Results</h3><ul>{p.detail.results.map(x=><li key={x}>{x}</li>)}</ul></div></section>
      <section className="learning-panel"><span className="case-number">06</span><h3>What I took from it</h3><p>{p.detail.learning}</p></section>
      <div className="case-footer"><div className="chips">{p.tech.map(t=><span key={t}>{t}</span>)}</div><blockquote>“{p.note}”</blockquote></div>
    </article>
  </div>
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
      <a className="github" href="https://github.com/Azbaengineer" target="_blank">GitHub ↗</a>
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
            <a className="button light" href="https://github.com/Azbaengineer" target="_blank">GitHub ↗</a>
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
          <a className="button light" href="https://www.linkedin.com/in/azbabanu" target="_blank">LinkedIn ↗</a>
        </div>
      </section>
    </main>

    <footer><span>AZBA © 2026</span><span>built with code, caffeine & suspiciously many animals</span></footer>

    {open && <CaseStudy p={open} onClose={()=>setOpen(null)}/>}
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);