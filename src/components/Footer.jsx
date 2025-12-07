import { useEffect, useState } from "react";

export default function Footer() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() =>  setNow(new Date()), 100);

        return () => clearInterval(t);
    }, [])
    
        };

    const day = now.getDate();
    const dayLabel  = day === 1 ? "1er" : String(day);
    const month = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.getFullYear();
    const pad = (n) => String(n).padStart(2, '0');
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return (
        <footer className="bg-dark text-white text-center p-3 mt-4">
            <p>
                Aujourd'hui nous sommes le {dayLabel} {month} {year}, il est {hours}:{minutes}:{seconds}
            </p>
            @2025 - Mini Projet Team MOA, Tous droits réservés.
        </footer>
    );
  