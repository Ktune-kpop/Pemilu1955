const partyData = {
            pni: {
                title: 'PNI - Partai Nasional Indonesia',
                ideology: 'Nasionalis Sekuler',
                tokoh: 'Soekarno, Sartono',
                logo: 'public/img/logo-pni.png',
                image: 'https://img.merahputih.com/media/71/73/54/717354a9feea6bd3e5b246670b1fb69a.jpg'
            },
            masyumi: {
                title: 'Masyumi - Majelis Syuro Muslimin Indonesia',
                ideology: 'Agama (Islam Modernis)',
                tokoh: 'Mohammad Natsir, Syafruddin Prawiranegara',
                logo: 'public/img/logo-masyumi.svg',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Mohammad_Natsir_1950s.jpg/250px-Mohammad_Natsir_1950s.jpg'
            },
            nu: {
                title: 'NU - Nahdlatul Ulama',
                ideology: 'Agama (Islam Tradisionalis)',
                tokoh: 'K.H. Wahab Hasbullah, K.H. Bisri Syansuri',
                logo: 'public/img/logo-nu.svg',
                image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEholin_DWa57n1vNm2s7J86HgqLdVxCQxGxyp_aVp5WWU4tmyKREfhKd2qn1F9c1BJM-5GeGevrb4W6K1Nu1wwRjaXpjsQK4V54IkQZ6zhstljDskJNUyXHda6uMYeUJzNvmEJ4yuYcPw2E/s1600/KH-Wahab-hasbullah.jpg'
            },
            pki: {
                title: 'PKI - Partai Komunis Indonesia',
                ideology: 'Komunis',
                tokoh: 'Semaun, Darsono, Alimin',
                logo: 'public/img/logo-pki.svg',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/DN_Aidit%2C_Njoto%2C_M.H._Lukman_and_Sudisman_%281963%29.jpg/320px-DN_Aidit%2C_Njoto%2C_M.H._Lukman_and_Sudisman_%281963%29.jpg'
            }
        };

        const timelineItems = document.querySelectorAll('.timeline-item');
        const barChartContainers = document.querySelectorAll('.bar-chart-container');

        const isElementInViewport = (el, offset = 100) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
                rect.bottom >= offset
            );
        };

        const checkVisibility = () => {
            timelineItems.forEach(item => {
                if (isElementInViewport(item, 150)) {
                    item.classList.add('visible');
                }
            });
            barChartContainers.forEach(container => {
                if (isElementInViewport(container, 100)) {
                    const bars = container.querySelectorAll('.bar-chart-bar');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            });
        };

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);

        const partyCards = document.querySelectorAll('.party-card');
        const modal = document.getElementById('party-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalIdeology = document.getElementById('modal-ideology');
        const modalTokoh = document.getElementById('modal-tokoh');
        const modalLogo = document.getElementById('modal-logo');
        const modalPosters = document.getElementById('modal-posters');

        partyCards.forEach(card => {
            card.addEventListener('click', () => {
                const partyKey = card.getAttribute('data-party');
                const data = partyData[partyKey];

                if (data) {
                    modalTitle.textContent = data.title;
                    modalIdeology.textContent = data.ideology;
                    modalTokoh.innerHTML = data.tokoh.split(', ').map(t => `<p>${t}</p>`).join('');
                    modalLogo.src = data.logo;

                    if (data.image) {
                        modalPosters.innerHTML = `
                            <img src="${data.image}" class="w-full max-w-[250px] sepia-filter rounded shadow-md mx-auto md:mx-0" alt="Contoh Tokoh Pendiri ${partyKey.toUpperCase()}">
                        `;
                    } else {
                        modalPosters.innerHTML = '';
                    }

                    modal.classList.remove('hidden');
                }
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
        };

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        const tabButtons = document.querySelectorAll('.tab-button');
        const dprContent = document.getElementById('dpr-content');
        const konstituanteContent = document.getElementById('konstituante-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.getAttribute('data-tab');

                tabButtons.forEach(btn => {
                    btn.classList.remove('active-tab');
                });
                button.classList.add('active-tab');

                if (tab === 'dpr') {
                    dprContent.classList.remove('hidden');
                    konstituanteContent.classList.add('hidden');
                } else if (tab === 'konstituante') {
                    dprContent.classList.add('hidden');
                    konstituanteContent.classList.remove('hidden');
                }
                checkVisibility();
            });
        });


        const galleryPhotos = document.querySelectorAll('.gallery-photo');
        const galleryModal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');

        galleryPhotos.forEach(photo => {
            photo.addEventListener('click', () => {
                modalImage.src = photo.src;
                modalImage.classList.remove('sepia-filter');
                modalCaption.textContent = photo.getAttribute('data-caption');
                galleryModal.classList.remove('hidden');
            });
        });

        const closeGalleryModal = () => {
            galleryModal.classList.add('hidden');
            modalImage.classList.add('sepia-filter');
        };

        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });

        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuOverlay = document.getElementById('menu-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        const hamburgerIcon = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`;
        const closeIcon = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

        const toggleMenu = () => {
            if (mobileMenu && menuOverlay && hamburgerBtn) {
                mobileMenu.classList.toggle('open');
                menuOverlay.classList.toggle('hidden');
                const isOpen = mobileMenu.classList.contains('open');
                hamburgerBtn.innerHTML = isOpen ? closeIcon : hamburgerIcon;
            } else {
                console.error("Elemen menu mobile tidak ditemukan!");
            }
        };

        if (hamburgerBtn && mobileMenu && menuOverlay) {
            hamburgerBtn.addEventListener('click', toggleMenu);
            menuOverlay.addEventListener('click', toggleMenu);
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });
        } else {
             console.error("Tombol hamburger, menu mobile, atau overlay tidak ditemukan!");
        }

        // ==========================
        // --- Logika Kuis Baru ---
        // ==========================
        const quizForm = document.getElementById('quiz-form');
        const resultContainer = document.getElementById('quiz-result-container');
        const resultEl = document.getElementById('quiz-result');
        const feedbackEl = document.getElementById('quiz-feedback');
        const resetButton = document.getElementById('quiz-reset-button');
        const quizSection = document.getElementById('kuis');

        const answerKey = {
            q1: 'c',
            q2: 'd',
            q3: 'b',
            q4: 'a',
            q5: 'c',
            q6: ['b', 'c'],
            q7: ['a', 'c'],
            q8: ['a', 'c'],
            q9: ['a', 'c'],
            q10: ['b', 'c', 'd']
        };

        const questionOrder = Object.keys(answerKey);

        const getQuestionType = (questionName) => {
            const input = quizForm.querySelector(`input[name="${questionName}"]`);
            return input ? input.type : null;
        };

        const getQuestionContainer = (questionName) => {
            const input = quizForm.querySelector(`input[name="${questionName}"]`);
            return input ? input.closest('.quiz-question') : null;
        };

        const getSelectedAnswers = (questionName, inputType) => {
            if (inputType === 'radio') {
                const checked = quizForm.querySelector(`input[name="${questionName}"]:checked`);
                return checked ? [checked.value] : [];
            }
            return Array.from(quizForm.querySelectorAll(`input[name="${questionName}"]:checked`)).map((input) => input.value);
        };

        const clearQuestionState = () => {
            quizForm.querySelectorAll('.quiz-question').forEach((question) => {
                question.classList.remove('unanswered');
            });
            quizForm.querySelectorAll('.quiz-options label').forEach((label) => {
                label.classList.remove('correct', 'incorrect');
            });
            quizForm.querySelectorAll('.quiz-answer-key').forEach((el) => el.remove());
        };

        const showCorrectAnswerText = (questionName, correctValues) => {
            const questionEl = getQuestionContainer(questionName);
            if (!questionEl) return;

            const options = quizForm.querySelectorAll(`input[name="${questionName}"]`);
            const answerTexts = [];
            options.forEach((input) => {
                if (correctValues.includes(input.value)) {
                    const label = input.closest('label');
                    answerTexts.push(label ? label.textContent.trim() : input.value);
                }
            });

            const answerNote = document.createElement('p');
            answerNote.className = 'quiz-answer-key';
            answerNote.textContent = `Jawaban benar: ${answerTexts.join(', ')}`;
            questionEl.appendChild(answerNote);
        };

        const validateQuiz = () => {
            const unanswered = [];
            questionOrder.forEach((questionName) => {
                const type = getQuestionType(questionName);
                const selected = getSelectedAnswers(questionName, type);
                if (selected.length === 0) unanswered.push(questionName);
            });
            return unanswered;
        };

        const isComplexQuestionCorrect = (selectedAnswers, correctAnswers) => {
            if (selectedAnswers.length !== correctAnswers.length) return false;
            return correctAnswers.every((answer) => selectedAnswers.includes(answer));
        };

        const reviewQuestion = (questionName, selectedAnswers, correctAnswers, inputType) => {
            const optionInputs = quizForm.querySelectorAll(`input[name="${questionName}"]`);
            let isCorrect = false;

            if (inputType === 'radio') {
                const selectedValue = selectedAnswers[0];
                isCorrect = selectedValue === correctAnswers[0];

                optionInputs.forEach((input) => {
                    const label = input.closest('label');
                    if (!label) return;
                    if (input.checked && input.value !== correctAnswers[0]) label.classList.add('incorrect');
                    if (input.value === correctAnswers[0]) label.classList.add('correct');
                });
            } else {
                isCorrect = isComplexQuestionCorrect(selectedAnswers, correctAnswers);

                optionInputs.forEach((input) => {
                    const label = input.closest('label');
                    if (!label) return;
                    const isExpected = correctAnswers.includes(input.value);
                    const isChosen = input.checked;
                    if (isExpected) label.classList.add('correct');
                    if (isChosen && !isExpected) label.classList.add('incorrect');
                });
            }

            if (!isCorrect) showCorrectAnswerText(questionName, correctAnswers);
            return isCorrect;
        };

        const updateResult = (score, maxScore) => {
            const percentage = ((score / maxScore) * 100).toFixed(0);
            resultEl.textContent = `Skor Anda: ${score} dari ${maxScore} (${percentage}%)`;

            if (Number(percentage) === 100) {
                feedbackEl.textContent = "Sempurna! Anda adalah ahli sejarah Pemilu 1955!";
            } else if (Number(percentage) >= 80) {
                feedbackEl.textContent = "Luar biasa! Pengetahuan Anda sangat baik.";
            } else if (Number(percentage) >= 50) {
                feedbackEl.textContent = "Bagus! Anda sudah memahami sebagian besar materi.";
            } else {
                feedbackEl.textContent = "Perlu belajar lagi, tapi jangan menyerah! Coba baca kembali materinya.";
            }

            resultContainer.classList.remove('hidden');
        };

        const getSwalTheme = () => ({
            background: document.body.classList.contains('dark-mode') ? '#2a2a2a' : '#ffffff',
            color: document.body.classList.contains('dark-mode') ? '#f5f5f5' : '#654321'
        });

        const fireSwal = (config) => {
            if (!window.Swal) return null;
            return Swal.fire({
                confirmButtonColor: '#654321',
                ...getSwalTheme(),
                ...config
            });
        };

        const resetQuizState = () => {
            quizForm.reset();
            clearQuestionState();
            resultContainer.classList.add('hidden');
            resultEl.textContent = '';
            feedbackEl.textContent = '';
            if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        if (quizForm && resultContainer && resultEl && feedbackEl) {
            quizForm.addEventListener('submit', (e) => {
                e.preventDefault();
                clearQuestionState();

                const unanswered = validateQuiz();
                if (unanswered.length > 0) {
                    unanswered.forEach((questionName) => {
                        const question = getQuestionContainer(questionName);
                        if (question) question.classList.add('unanswered');
                    });
                    const firstUnanswered = getQuestionContainer(unanswered[0]);
                    if (firstUnanswered) firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (window.Swal) {
                        fireSwal({
                            icon: 'warning',
                            title: 'Jawaban Belum Lengkap',
                            text: 'Masih ada soal yang belum dijawab. Silakan lengkapi semua soal terlebih dahulu.',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        alert('Masih ada soal yang belum dijawab. Silakan lengkapi semua soal terlebih dahulu.');
                    }
                    return;
                }

                let score = 0;
                questionOrder.forEach((questionName) => {
                    const type = getQuestionType(questionName);
                    const selected = getSelectedAnswers(questionName, type);
                    const key = Array.isArray(answerKey[questionName]) ? answerKey[questionName] : [answerKey[questionName]];
                    const isCorrect = reviewQuestion(questionName, selected, key, type);
                    if (isCorrect) score++;
                });

                updateResult(score, questionOrder.length);
                if (window.Swal) {
                    fireSwal({
                        icon: 'success',
                        title: 'Jawaban Terkirim',
                        text: `Skor Anda ${score} dari ${questionOrder.length}.`,
                        confirmButtonText: 'Lihat Hasil'
                    });
                }
                resultContainer.scrollIntoView({ behavior: 'smooth' });
            });

            if (resetButton) {
                resetButton.addEventListener('click', () => {
                    if (window.Swal) {
                        fireSwal({
                            icon: 'question',
                            title: 'Reset Kuis?',
                            text: 'Semua jawaban dan hasil akan dihapus.',
                            showCancelButton: true,
                            confirmButtonText: 'Ya, Reset',
                            cancelButtonText: 'Batal'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                resetQuizState();
                                fireSwal({
                                    icon: 'success',
                                    title: 'Kuis Direset',
                                    text: 'Semua jawaban sudah dibersihkan.',
                                    confirmButtonText: 'OK'
                                });
                            }
                        });
                    } else {
                        resetQuizState();
                    }
                });
            }
        }


