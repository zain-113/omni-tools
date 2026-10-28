'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner300() {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current || bannerRef.current.firstChild) return;

        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `
      atOptions = {
        'key' : '1374da69a2682bad082b91640697bb54',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

        const adScript = document.createElement('script');
        adScript.type = 'text/javascript';
        adScript.src = 'https://bauval.org/22/1374da69a2682bad082b91640697bb54';

        bannerRef.current.appendChild(confScript);
        bannerRef.current.appendChild(adScript);
    }, []);

    return (
        <div className="flex justify-center items-center my-6 min-h-[250px] w-full overflow-hidden">
            <div ref={bannerRef} className="w-[300px] h-[250px] bg-slate-100 dark:bg-slate-900 rounded-md" />
        </div>
    );
}