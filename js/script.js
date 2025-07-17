
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            const dataNascimento = document.getElementById('dataNascimento').value;
            const noticias = document.getElementById('noticias').checked;

           
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

           
            let dataFormatada = '';
            if (dataNascimento) {
                const data = new Date(dataNascimento);
                dataFormatada = data.toLocaleDateString('pt-BR');
            }

         
            const formDataDisplay = document.getElementById('formDataDisplay');
            formDataDisplay.innerHTML = `
                <h3> Dados Enviados com Sucesso!</h3>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ''}
                <p><strong>Assunto:</strong> ${assunto}</p>
                <p><strong>Mensagem:</strong> ${mensagem}</p>
                ${dataNascimento ? `<p><strong>Data de Nascimento:</strong> ${dataFormatada}</p>` : ''}
                <p><strong>noticias:</strong> ${noticias ? 'Sim, desejo receber' : 'Não desejo receber'}</p>
                <p><em>Obrigado pelo seu contato! Responderemos em breve.</em></p>
            `;
            
           
            formDataDisplay.classList.add('show');
            
            
            formDataDisplay.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });

            
        });

    
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email && !emailRegex.test(email)) {
                    this.style.borderColor = '#ff0000';
                    this.style.boxShadow = '0 0 0 3px rgba(255, 0, 0, 0.1)';
                } else {
                    this.style.borderColor = '#ddd';
                    this.style.boxShadow = 'none';
                }
            });
        }

    
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function() {
                let value = this.value.replace(/\D/g, '');
                
                // Limita a 11 dígitos (DDD + 9 dígitos)
                if (value.length > 11) {
                    value = value.substring(0, 11);
                }
                
                // Aplica a formatação baseada no comprimento
                if (value.length >= 11) {
                    // Celular: (11) 99999-9999
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 10) {
                    // Fixo: (11) 9999-9999
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 6) {
                    // Parcial com hífen: (11) 9999-
                    value = value.replace(/(\d{2})(\d{4})(\d*)/, '($1) $2-$3');
                } else if (value.length >= 2) {
                    // Apenas DDD: (11) 
                    value = value.replace(/(\d{2})(\d*)/, '($1) $2');
                } else if (value.length >= 1) {
                    // Iniciando DDD: (1
                    value = value.replace(/(\d*)/, '($1');
                }
                
                this.value = value;
            });
        }


        const resetButton = contactForm.querySelector('button[type="reset"]');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                const formDataDisplay = document.getElementById('formDataDisplay');
                formDataDisplay.classList.remove('show');
                formDataDisplay.innerHTML = '';
                
           
                const inputs = contactForm.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.style.borderColor = '#ddd';
                    input.style.boxShadow = 'none';
                });
            });
        }
    }

 
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                
              
                if (window.innerWidth <= 767) {
                    dropdownContent.style.display = 
                        dropdownContent.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });


    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 767) {
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent && !dropdown.contains(e.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
        }
    });
});

