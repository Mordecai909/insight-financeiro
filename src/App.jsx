import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Activity, LineChart, MoveRight, CheckCircle2, Shield, ArrowUpCircle, ArrowDownCircle, Wallet, Plus, Trash2, Pencil } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 w-[90%] max-w-4xl text-background border border-transparent [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-primary [&.scrolled]:border-primary/20 [&.scrolled]:shadow-xl"
    >
      <div className="font-heading font-bold text-xl tracking-tight">Insight Financeiro</div>
      <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm">
        <a href="#features" className="hover:-translate-y-[1px] transition-transform">Diagnóstico</a>
        <a href="#dashboard" className="hover:-translate-y-[1px] transition-transform">O Sistema</a>
      </div>
      <a 
        href="#donate" 
        className="relative overflow-hidden group bg-accent text-background px-5 py-2.5 rounded-full font-bold text-sm tracking-wide hover:scale-[1.03] transition-all duration-300"
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <span className="relative z-10">Faça sua Doação</span>
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      </a>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop" 
          alt="Dark Forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text text-heading text-background/90 text-2xl md:text-4xl font-bold">Saúde financeira é a</span>
          <span className="hero-text text-drama text-background text-6xl md:text-8xl mt-2 leading-[0.9]">Previsibilidade.</span>
        </h1>
        <p className="hero-text text-background/70 font-mono mt-8 max-w-lg">
          Para pessoas que têm dificuldade de administrar o próprio dinheiro. Sem planilhas complexas. Apenas clareza direta.
        </p>
        <div className="hero-text mt-10">
          <a 
            href="#donate"
            className="group relative inline-flex items-center gap-3 bg-accent text-background px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.03] transition-transform overflow-hidden"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Apoie o Projeto <Heart size={20} className="group-hover:animate-pulse" />
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Artefatos Funcionais ---

const DiagnosticShuffler = ({ transactions }) => {
  const recurrentTerms = ['netflix', 'spotify', 'amazon', 'prime', 'assinatura', 'plano', 'mensalidade', 'gympass', 'academia'];
  
  const vazamentos = (transactions || [])
    .filter(t => t.type === 'expense' && recurrentTerms.some(term => t.desc.toLowerCase().includes(term)))
    .map(t => ({ id: t.id, text: `R$ ${t.amount.toFixed(2).replace('.', ',')} - ${t.desc}`, amount: t.amount }));

  const totalVazamento = vazamentos.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-xl border border-primary/10 h-80 flex flex-col relative overflow-hidden transition-all duration-300">
      <h3 className="text-heading font-bold mb-2">Diagnostic Shuffler</h3>
      <p className="opacity-60 text-sm mb-6">Mapeando vazamentos invisíveis</p>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
        {vazamentos.length === 0 ? (
          <div className="text-sm font-sans opacity-50 flex items-center justify-center h-full text-center">Nenhuma assinatura detectada.</div>
        ) : (
          vazamentos.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-black/5 flex items-center gap-3 shrink-0">
              <Shield className="text-accent" size={20} />
              <span className="font-sans font-medium text-sm text-dark line-clamp-1">{item.text}</span>
            </div>
          ))
        )}
      </div>

      {vazamentos.length > 0 && (
        <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center shrink-0">
          <span className="text-xs font-mono opacity-60">Impacto Mensal:</span>
          <span className="text-sm font-bold text-accent">R$ {totalVazamento.toFixed(2).replace('.', ',')}</span>
        </div>
      )}
    </div>
  );
};

const TelemetryTypewriter = ({ transactions }) => {
  const [displayState, setDisplayState] = useState({ text: 'Aguardando novas transações...', isTyping: false });
  const lastTx = transactions?.[0];
  const lastTxId = lastTx?.id;
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!lastTx) {
      // Use timeout so setState is inside a callback, not directly in effect body
      const t = setTimeout(() => {
        setDisplayState({ text: 'Aguardando novas transações...', isTyping: false });
      }, 0);
      return () => clearTimeout(t);
    }

    const content = `DETECTADO: Novo Registro.\nTIPO: ${lastTx.type === 'income' ? 'Entrada' : 'Saída'}.\nDESC: ${lastTx.desc}.\nVALOR: R$ ${lastTx.amount.toFixed(2).replace('.', ',')}`;
    let i = 0;

    timerRef.current = setInterval(() => {
      i++;
      if (i <= content.length) {
        setDisplayState({ text: content.substring(0, i), isTyping: i < content.length });
      } else {
        clearInterval(timerRef.current);
      }
    }, 20);

    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTxId]);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-xl border border-primary/10 h-80 flex flex-col relative transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-heading font-bold mb-1">Live Feed</h3>
          <p className="opacity-60 text-sm">Monitor de Transações</p>
        </div>
        <div className={`w-2 h-2 rounded-full bg-accent ${displayState.isTyping ? 'animate-pulse' : 'opacity-50'}`}></div>
      </div>
      <div className="flex-1 bg-dark/5 rounded-xl p-4 font-mono text-sm text-primary overflow-hidden whitespace-pre-line">
        {displayState.text}
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" style={{ opacity: displayState.isTyping ? 1 : 0}}></span>
      </div>
    </div>
  );
};

const ProtocolScheduler = ({ transactions }) => {
  const dte = new Date();
  const currentHoverDay = dte.getDay(); // 0 = Sunday
  
  const [selectedDay, setSelectedDay] = useState(currentHoverDay);
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const getDayTotal = (dayIndex) => {
    if (!transactions) return 0;
    return transactions.filter(t => {
      if (t.type !== 'expense') return false;
      const tDate = new Date(t.date + "T12:00:00");
      return tDate.getDay() === dayIndex;
    }).reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-xl border border-primary/10 h-80 flex flex-col relative overflow-hidden transition-all duration-300">
      <h3 className="text-heading font-bold mb-2">Protocol Scheduler</h3>
      <p className="opacity-60 text-sm mb-6">Controle Semanal de Gastos</p>
      
      <div className="grid grid-cols-7 gap-2 mb-6 relative z-10 w-full max-w-[260px]">
        {days.map((d, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedDay(i)}
            className={`flex items-center justify-center aspect-square rounded-md border text-xs font-mono transition-colors ${
              selectedDay === i ? 'bg-accent text-white border-accent shadow-md' : 'border-primary/10 hover:border-accent/40 text-dark'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      
      <div className="bg-dark/5 rounded-xl p-4 flex-1 flex flex-col justify-center items-center text-center">
        <span className="text-xs font-mono opacity-60 mb-1">Total gasto neste dia da semana:</span>
        <span className="text-2xl font-bold text-dark">R$ {getDayTotal(selectedDay).toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );
};

const Features = ({ transactions }) => {
  return (
    <section id="features" className="py-32 px-6 md:px-16 bg-white/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <DiagnosticShuffler transactions={transactions} />
        <TelemetryTypewriter transactions={transactions} />
        <ProtocolScheduler transactions={transactions} />
      </div>
    </section>
  );
};

const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philo-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 px-6 md:px-16 overflow-hidden bg-dark text-background">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop" 
          alt="Moss Texture" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16">
        <p className="philo-line font-sans text-xl md:text-2xl text-background/60 max-w-2xl">
          A maioria da indústria financeira foca em: <span className="line-through">planilhas complexas, culpa por pequenos gastos e jargões inatingíveis</span>.
        </p>
        <p className="philo-line text-drama text-5xl md:text-8xl leading-tight">
          Nós focamos em: <span className="text-accent not-italic font-heading">Clareza Absoluta.</span>
        </p>
      </div>
    </section>
  );
};

const DashboardSection = ({ transactions, addTransaction, removeTx, updateTx }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    
    if (editingId) {
      updateTx(editingId, { type, amount: parseFloat(amount), desc });
      setEditingId(null);
    } else {
      addTransaction({
        id: Date.now(),
        type,
        amount: parseFloat(amount),
        desc,
        date: new Date().toISOString().split('T')[0]
      });
    }
    setDesc('');
    setAmount('');
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setDesc(t.desc);
    setAmount(t.amount.toString());
    setType(t.type);
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <section id="dashboard" className="py-32 px-6 md:px-16 bg-[#111312] text-background relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-heading text-4xl md:text-5xl font-bold mb-4">O Sistema <span className="text-accent">.</span></h2>
          <p className="opacity-60 max-w-xl text-lg font-sans">Simule suas movimentações financeiras com clareza. Controle seu saldo disponível e mapeie cada centavo.</p>
        </div>

        {/* Resumo de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1C211E] rounded-[2rem] p-8 border border-white/5 hover:border-primary/40 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm opacity-60">Saldo Disponível</span>
              <Wallet size={20} className="text-primary opacity-80" />
            </div>
            <div className={`text-4xl font-heading font-bold tracking-tight ${balance >= 0 ? 'text-primary' : 'text-accent'}`}>
              R$ {formatCurrency(balance)}
            </div>
          </div>
          <div className="bg-primary text-background rounded-[2rem] p-8 shadow-lg shadow-primary/10 hover:scale-[1.01] transition-transform">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm opacity-80">Entradas</span>
              <ArrowUpCircle size={20} className="opacity-80 text-green-300" />
            </div>
            <div className="text-4xl font-heading font-bold tracking-tight">
              R$ {formatCurrency(totalIncome)}
            </div>
          </div>
          <div className="bg-[#1C211E] rounded-[2rem] p-8 border border-white/5 hover:border-accent/40 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm opacity-60">Saídas</span>
              <ArrowDownCircle size={20} className="text-accent" />
            </div>
            <div className="text-4xl font-heading font-bold tracking-tight">
              R$ {formatCurrency(totalExpense)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário Novo Registro */}
          <div className="lg:col-span-1 bg-[#1C211E] rounded-[2rem] p-8 border border-white/5 self-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="font-heading font-bold text-xl mb-6 relative z-10 text-background">Novo Registro</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
              <div className="flex bg-[#111312] rounded-xl p-1 border border-white/5">
                <button type="button" onClick={() => setType('income')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'income' ? 'bg-primary text-white shadow-md' : 'text-background/40 hover:text-background'}`}>Receita</button>
                <button type="button" onClick={() => setType('expense')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'expense' ? 'bg-accent text-white shadow-md' : 'text-background/40 hover:text-background'}`}>Despesa</button>
              </div>
              <input type="text" placeholder="Descrição (Ex: Mercado)" value={desc} onChange={e => setDesc(e.target.value)} className="bg-[#111312] rounded-xl px-4 py-3 w-full border-transparent focus:border-white/10 focus:ring-0 outline-none transition-all placeholder:text-background/20 font-sans text-background" required />
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-background/30 font-mono text-sm">R$</span>
                <input type="number" step="0.01" placeholder="0,00" value={amount} onChange={e => setAmount(e.target.value)} className="bg-[#111312] rounded-xl pl-12 pr-4 py-3 w-full border-transparent focus:border-white/10 focus:ring-0 outline-none transition-all placeholder:text-background/20 font-sans text-background" required />
              </div>
              <button type="submit" className={`mt-2 text-background rounded-xl py-4 font-bold tracking-wide hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 ${editingId ? 'bg-primary/80' : 'bg-primary'}`}>
                {editingId ? <><Pencil size={18} /> Atualizar Registro</> : <><Plus size={18} /> Adicionar</>}
              </button>
            </form>
          </div>

          {/* Ledger / Tabela Minimalista Aterrada */}
          <div className="lg:col-span-2 rounded-[2rem] p-6 lg:p-8 bg-transparent border border-white/5">
            <h3 className="font-heading font-bold text-xl mb-6 text-background/80">Últimas Movimentações</h3>
            {transactions.length === 0 ? (
              <div className="text-center py-16 opacity-30">
                <p className="font-mono text-sm">Nenhuma movimentação registrada.</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-white/5">
                {transactions.map(t => (
                  <div key={t.id} className="group flex items-center justify-between py-4 hover:px-2 rounded-lg hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                        {t.type === 'income' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                      </div>
                      <div>
                        <p className="font-bold font-sans text-sm text-background">{t.desc}</p>
                        <p className="font-mono text-[10px] opacity-40 text-background">{t.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold tracking-tight ${t.type === 'income' ? 'text-primary' : 'text-background/80'}`}>
                        {t.type === 'income' ? '+' : '-'} R$ {formatCurrency(t.amount)}
                      </span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(t)} className="text-secondary hover:text-primary transition-all p-2 rounded-full hover:bg-white/10" aria-label="Editar">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => removeTx(t.id)} className="text-accent/60 hover:text-accent transition-all p-2 rounded-full hover:bg-accent/10" aria-label="Remover">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const DonateSection = () => {
  return (
    <section id="donate" className="py-32 px-6 md:px-16 bg-background relative z-10">
      <div className="max-w-4xl mx-auto outline outline-1 outline-primary/20 rounded-[3rem] p-12 text-center bg-white/50 backdrop-blur-sm shadow-2xl">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
          <Heart size={32} />
        </div>
        <h2 className="text-heading text-4xl md:text-5xl mb-6 font-bold">Faça Parte do Ecossistema</h2>
        <p className="text-lg opacity-70 mb-10 max-w-xl mx-auto">
          Este aplicativo está sendo construído para ajudar quem mais precisa. Ao fazer uma pequena doação, você me ajuda a financiar a estrutura necessária para mantê-lo no ar.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="https://mpago.la/2vpKYEm" target="_blank" rel="noreferrer" className="bg-accent text-background px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.03] transition-transform shadow-lg shadow-accent/20 flex items-center justify-center gap-3 w-full md:w-auto overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2">Doar R$ 2,50 <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
          <button className="bg-transparent border border-primary text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.03] transition-transform w-full md:w-auto">
            Outro Valor
          </button>
        </div>
        <p className="mt-6 font-mono text-xs opacity-50 uppercase tracking-widest">*Transação segura via Mercado Pago*</p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-background rounded-t-[4rem] px-6 py-16 md:px-16 md:py-24 relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="font-heading font-bold text-3xl mb-4">Insight Financeiro</h3>
          <p className="opacity-60 max-w-sm">Simplificando gestões complexas para vidas em movimento.</p>
        </div>
        <div className="flex flex-col items-start md:items-end md:justify-start">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-xs tracking-widest text-green-500/80 uppercase">System Operational</span>
          </div>
          <div className="font-sans text-sm opacity-40">
            &copy; {new Date().getFullYear()} Insight Financeiro. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('@insight-fin-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      { id: 1, type: 'income', amount: 3500.00, desc: 'Salário Mensal', date: new Date().toISOString().split('T')[0] },
      { id: 2, type: 'expense', amount: 120.50, desc: 'Supermercado', date: new Date().toISOString().split('T')[0] }
    ];
  });

  useEffect(() => {
    localStorage.setItem('@insight-fin-data', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };
  
  const removeTx = (id) => setTransactions(transactions.filter(t => t.id !== id));
  
  const updateTx = (id, updatedData) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features transactions={transactions} />
      <Philosophy />
      <DashboardSection transactions={transactions} addTransaction={addTransaction} removeTx={removeTx} updateTx={updateTx} />
      <DonateSection />
      <Footer />
    </div>
  );
}

export default App;
