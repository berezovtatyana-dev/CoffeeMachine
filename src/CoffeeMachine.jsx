import React, { useState, useEffect} from "react";
import styles from './CoffeeMachine.module.css';

function CoffeeMachine() {
    
    const [water, setWater] = useState(100); // изначально 100%
    const [berns, setBerns] = useState(250); // 250г
    const [milk, setMilk] = useState(1000); //1000мл

    const [coffeeType, setCoffeeType] = useState('espresso');
    const [status, setStatus] = useState('idle');

    const recipes = {
        espresso: {water: 20, berns: 20, milk: 0},
        latte: {water: 10, berns: 20, milk: 150}
    };
    const enoughResourses = () => {
        const recipe = recipes[coffeeType];
        if (!recipe) return false;
        return (water >= recipe.water) && (berns >= recipe.berns) && (milk >= recipe.milk);
    };
    const startBrewing = () => {
        if (status !== 'idle' && status !== 'error') {
            alert('Ошибка! Кофемашина занята');
            return;
        }
        if (!enoughResourses()) {
            alert('Ошибка! Не хватает ресурсов') && setStatus('error');
            return;
        }
        setStatus('brewing');
        alert('Начинаю готовить...');

    };
    useEffect(() => {
        if (status === 'brewing') {
            const timer = setTimeout(() => {
                const recipe = recipes[coffeeType];
                setWater(prev => prev-recipe.water);
                setBerns(prev => prev-recipe.berns);
                setMilk(prev => prev-recipe.milk);
                alert('Ваш кофе готов!');
                setStatus('ready');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status, coffeeType]);
    useEffect(() => {
        if (status === 'ready') {
            const timer = setTimeout(() => {
                setStatus('idle');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);
    useEffect(() => {
        if (water < 20 && status !== 'error') {
            setStatus('error');
            alert('Ошибка! Недостаточно воды');
        }

    }, [water]);

    const isStartDisabled = status !== 'idle' || !enoughResourses();

    return (
        <div className={styles.machine}>
            <h1>Кофемашина</h1>
            <div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '15px', borderBottom: '2px dashed burlywood'}}>
                <p style={{fontSize: '18px', color: 'burlywood'}}>Статус: </p>
                <span className={styles[status]}> {status}</span>

            </div>
            <div className={styles.resourses}>
                <div style={{display: 'flex', alignItems: 'center'}}><div style={{margin: '15px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: water < 20 ? 'red' : 'darkblue'}}></div><p>Вода: {water}%</p></div>
                <div className={styles.progressBar}>
                        <div style={{
                                width: `${water}%`,
                                height: '6px',
                                backgroundColor: 'orange'
                        }}
                        ></div>
                        <div style={{width: `${100-water}%`,
                                    height: '6px',
                                    }}>

                        </div>
                    </div>
            </div>
{/* ecrjhbnm */}
                <div className={styles.resourses}>
                    <p style={{paddingLeft: '35px', textAlign: 'left'}}> Зерна: {berns}г</p>
                    <div className={styles.progressBar}>
                        <div style={{ width: `${(berns / 250) * 100}%`,
                                    height: '6px',
                                    backgroundColor: 'orange' }}
                        ></div>
                        <div style={{width: `${100-(berns / 250) * 100}%`,
                                    height: '6px'}}>

                        </div>
                    </div>
                </div>

                <div className={styles.resourses}>
                    <p style={{paddingLeft: '35px', textAlign: 'left'}}>Молоко: {milk}мл</p>
                    <div className={styles.progressBar}>
                        <div 
                            style={{ width: `${(milk / 1000) * 100}%`, height: '6px', backgroundColor: 'orange' }}
                        ></div>
                    </div>
                </div>
{/* Выбор напитка (сетка Grid из CSS Modules) */}
            <div className={styles.coffeeGrid}>
                <button
                    className={`${styles.coffeeCard} ${coffeeType === 'espresso' ? styles.active : ''}`}
                    onClick={() => setCoffeeType('espresso')}
                    disabled={status !== 'idle'}
                >
                    <span style={{fontSize: '18px'}}>Эспрессо: </span>
                    <span> Вода:20% | Зерна:20г</span>
                </button>

                <button
                    className={`${styles.coffeeCard} ${coffeeType === 'latte' ? styles.active : ''}`}
                    onClick={() => setCoffeeType('latte')}
                    disabled={status !== 'idle'}
                >
                    <span style={{fontSize: '18px'}}>Латте: </span>
                    <span>Вода: 10% | Зерна: 20г | Молоко: 150мл</span>
                </button>
            </div>

            {/* Кнопки управления */}
            <div className={styles.buttons}>
                <button
                    className={`${styles.startBtn}` 
                    // ${styles.disabled : ''}`
                }
                    onClick={startBrewing}
                    disabled={isStartDisabled}
                    style={{backgroundColor: (!enoughResourses() && status === 'idle') ? 'red' : 'rgb(194, 161, 118)'
                    }}
                >
                    Старт
                </button>
            </div>
        </div>
    );

}

export default CoffeeMachine;