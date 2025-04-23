import React from 'react';
import styles from './paginator.module.css';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    isInputVisible: boolean;
    inputPage: string;
    setInputPage: React.Dispatch<React.SetStateAction<string>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputSubmit: (e: React.KeyboardEvent) => void;
    handleDotsClick: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    isInputVisible,
    inputPage,
    setInputPage,
    handleInputChange,
    handleInputSubmit,
    handleDotsClick
}) => {
    const pageNumbers = () => {
        let pages = [];
        if (totalPages <= 5) {
            pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            pages = [
                1,
                2,
                3,
                '...',
                totalPages,
            ];
        }
        return pages;
    };

    return (
        <>
            <div className={styles.pagination}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    &lt;
                </button>

                {pageNumbers().map((number, index) => {
                    if (number === '...') {
                        return (
                            <div key={`dots-${index}`} className={styles.dots} onClick={handleDotsClick}>
                                {isInputVisible ? (
                                    <input
                                        type="text"
                                        value={inputPage}
                                        onChange={handleInputChange}
                                        onKeyDown={handleInputSubmit}
                                        min={1}
                                        max={totalPages}
                                        className={styles.pageInput}
                                        autoFocus
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={'...'}
                                        onChange={handleInputChange}
                                        onKeyDown={handleInputSubmit}
                                        min={1}
                                        max={totalPages}
                                        className={styles.pageInput}
                                        autoFocus
                                    />
                                )}
                            </div>
                        );
                    }

                    return (
                        <button
                            key={number}
                            onClick={() => goToPage(Number(number))}
                            className={currentPage === number ? styles.active : ''}
                        >
                            {number}
                        </button>
                    );
                })}

                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>

            <span className={styles.pageIndicator}>
                Página {currentPage} de {totalPages}
            </span>
        </>
    );
};

export default Paginator;
