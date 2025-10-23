import React, { useState } from 'react';
import './Calculator.scss';

const BUTTONS = [
    // Row: memory
    [{ id: 'MC', label: 'MC', type: 'memory' }, { id: 'MR', label: 'MR', type: 'memory' }, { id: 'MS', label: 'MS', type: 'memory' }, { id: 'M+', label: 'M+', type: 'memory' }],
    // Row: top controls
    [{ id: 'back', label: 'Back', type: 'control' }, { id: 'CE', label: 'CE', type: 'control' }, { id: 'C', label: 'C', type: 'control' }],
    // Row: functions right
    [
        { id: '7', label: '7', type: 'digit' }, { id: '8', label: '8', type: 'digit' }, { id: '9', label: '9', type: 'digit' },
        { id: '/', label: '/', type: 'op' }, { id: 'sqrt', label: 'sqrt', type: 'func' }
    ],
    [
        { id: '4', label: '4', type: 'digit' }, { id: '5', label: '5', type: 'digit' }, { id: '6', label: '6', type: 'digit' },
        { id: '*', label: '*', type: 'op' }, { id: '%', label: '%', type: 'func' }
    ],
    [
        { id: '1', label: '1', type: 'digit' }, { id: '2', label: '2', type: 'digit' }, { id: '3', label: '3', type: 'digit' },
        { id: '-', label: '-', type: 'op' }, { id: '1/x', label: '1/x', type: 'func' }
    ],
    [
        { id: 'M+', label: 'M+', hidden: true, type: 'memory' }, // spacer to align layout on small grid
        { id: '0', label: '0', type: 'digit' }, { id: '+/-', label: '+/-', type: 'func' }, { id: '.', label: '.', type: 'digit' },
        { id: '+', label: '+', type: 'op' }, { id: '=', label: '=', type: 'equals' }
    ]
];

function formatNumber(value) {
    if (!Number.isFinite(value)) return 'Error';
    const str = String(value);
    return str.length > 16 ? Number(value).toPrecision(12) : str;
}

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [accumulator, setAccumulator] = useState(null); // previous value
    const [pendingOp, setPendingOp] = useState(null);
    const [overwrite, setOverwrite] = useState(true);
    const [memory, setMemory] = useState(0);

    const inputDigit = (d) => {
        setDisplay((prev) => {
            if (overwrite) {
                setOverwrite(false);
                return d === '.' ? '0.' : d;
            }
            if (d === '.' && prev.includes('.')) return prev;
            return prev === '0' && d !== '.' ? d : prev + d;
        });
    };

    const applyPending = (nextOp) => {
        const current = parseFloat(display);
        if (accumulator == null) {
            setAccumulator(current);
            setPendingOp(nextOp);
            setOverwrite(true);
            return;
        }

        let result = accumulator;
        if (pendingOp === '+') result = accumulator + current;
        if (pendingOp === '-') result = accumulator - current;
        if (pendingOp === '*') result = accumulator * current;
        if (pendingOp === '/') result = current === 0 ? NaN : accumulator / current;

        setAccumulator(result);
        setDisplay(formatNumber(result));
        setPendingOp(nextOp);
        setOverwrite(true);
    };

    const handleEquals = () => {
        if (pendingOp == null || accumulator == null) return;
        const current = parseFloat(display);
        let result = accumulator;
        if (pendingOp === '+') result = accumulator + current;
        if (pendingOp === '-') result = accumulator - current;
        if (pendingOp === '*') result = accumulator * current;
        if (pendingOp === '/') result = current === 0 ? NaN : accumulator / current;
        setDisplay(formatNumber(result));
        setAccumulator(null);
        setPendingOp(null);
        setOverwrite(true);
    };

    const handleFunc = (id) => {
        const current = parseFloat(display);
        let result = current;
        if (id === 'sqrt') result = current < 0 ? NaN : Math.sqrt(current);
        if (id === '%') result = (accumulator ?? 0) * (current / 100);
        if (id === '1/x') result = current === 0 ? NaN : 1 / current;
        if (id === '+/-') result = -current;
        setDisplay(formatNumber(result));
        setOverwrite(true);
    };

    const handleControl = (id) => {
        if (id === 'back') {
            setDisplay((prev) => (overwrite ? prev : prev.length > 1 ? prev.slice(0, -1) : '0'));
            return;
        }
        if (id === 'CE') {
            setDisplay('0');
            setOverwrite(true);
            return;
        }
        if (id === 'C') {
            setDisplay('0');
            setAccumulator(null);
            setPendingOp(null);
            setOverwrite(true);
            return;
        }
    };

    const handleMemory = (id) => {
        const current = parseFloat(display);
        if (id === 'MC') setMemory(0);
        if (id === 'MR') setDisplay(formatNumber(memory));
        if (id === 'MS') setMemory(current);
        if (id === 'M+') setMemory((m) => m + current);
        setOverwrite(true);
    };

    const onButton = (btn) => {
        if (btn.hidden) return;
        if (btn.type === 'digit') return inputDigit(btn.id);
        if (btn.type === 'op') return applyPending(btn.id);
        if (btn.type === 'equals') return handleEquals();
        if (btn.type === 'func') return handleFunc(btn.id);
        if (btn.type === 'control') return handleControl(btn.id);
        if (btn.type === 'memory') return handleMemory(btn.id);
    };

    return (
        <div className="calc-container">
            <div className="calc-menu-bar">
                <span className="menu-label">Edit</span>
                <span className="menu-label">View</span>
                <span className="menu-label">Help</span>
            </div>

            <div className="calc-display">
                <div className="calc-display-text">{display}</div>
            </div>

            <div className="calc-keypad">
                {BUTTONS.map((row, rIdx) => (
                    <div className="calc-row" key={`r-${rIdx}`}>
                        {row.map((btn) => (
                            <button
                                key={btn.id}
                                className={`calc-btn ${btn.type} ${btn.hidden ? 'hidden' : ''}`}
                                onClick={() => onButton(btn)}
                                disabled={btn.hidden}
                                title={btn.label}
                            >
                                <span>{btn.label}</span>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calculator;


