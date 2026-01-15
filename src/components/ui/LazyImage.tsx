import React, { useState, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string; // Applied to the wrapper div
    imgClassName?: string; // Applied to the img element
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    priority = false,
    className = "",
    imgClassName = "",
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [srcSet, setSrcSet] = useState<string | undefined>(undefined);

    useEffect(() => {
        // Check if it's an Unsplash URL to optimize
        if (src.includes('images.unsplash.com')) {
            const baseUrl = src.split('?')[0];
            const params = new URLSearchParams(src.split('?')[1]);

            const getUrl = (width: number) => {
                const newParams = new URLSearchParams(params);
                newParams.set('w', width.toString());
                newParams.set('q', '80');
                newParams.set('auto', 'format');
                return `${baseUrl}?${newParams.toString()}`;
            };

            setSrcSet(`
        ${getUrl(300)} 300w,
        ${getUrl(600)} 600w,
        ${getUrl(900)} 900w,
        ${getUrl(1200)} 1200w,
        ${getUrl(2000)} 2000w
      `);
        } else {
            setSrcSet(undefined);
        }
    }, [src]);

    return (
        <div className={`overflow-hidden relative ${className}`}>
            {/* Placeholder */}
            <div
                className={`absolute inset-0 bg-stone-200 dark:bg-stone-800 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            <img
                src={currentSrc}
                srcSet={srcSet}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${imgClassName}`}
                {...props}
            />
        </div>
    );
};

export default LazyImage;
