
  function createInfiniteScroll(rowElement, speed, direction = 1) {
    let pos = 0;  

    function step() { 
      pos += speed * direction;
      rowElement.style.transform = `translateX(${pos}px)`;

      const firstChild = rowElement.children[0];
      const lastChild = rowElement.children[rowElement.children.length - 1];
      const rowRect = rowElement.getBoundingClientRect();
      const firstRect = firstChild.getBoundingClientRect();
      const lastRect = lastChild.getBoundingClientRect();
 
      if (direction === 1) { 
        if (firstRect.right < 0) { 
          rowElement.appendChild(firstChild); 
          pos += firstRect.width + 40;  
          rowElement.style.transform = `translateX(${pos}px)`;
        }
      } else { 
        if (lastRect.left > window.innerWidth) { 
          rowElement.insertBefore(lastChild, rowElement.children[0]); 
          pos -= lastRect.width + 40;
          rowElement.style.transform = `translateX(${pos}px)`;
        }
      }

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('load', function () {
    const rowLeft = document.getElementById('row-left');
    const rowRight = document.getElementById('row-right');
 
    createInfiniteScroll(rowLeft, 1.5, 1);   
    createInfiniteScroll(rowRight, 1.5, -1); 
  });
 

  document.addEventListener("DOMContentLoaded", function () {
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const viewLessBtn = document.getElementById("viewLessBtn");
    const extraServices = document.querySelectorAll(".extra-service");

    viewMoreBtn.addEventListener("click", function () {
      extraServices.forEach(card => {
        card.classList.remove("d-none");    
      });
      viewMoreBtn.classList.add("d-none");  
      viewLessBtn.classList.remove("d-none");  
    });

    viewLessBtn.addEventListener("click", function () {
      extraServices.forEach(card => {
        card.classList.add("d-none");     
      });
      viewLessBtn.classList.add("d-none");  
      viewMoreBtn.classList.remove("d-none");  
    });
  });


  
        AOS.init({ duration: 800, once: true });

        (function() {
            emailjs.init("xzBpQi5U68rp562Lu");  
        })();

        document.getElementById("contactForm").addEventListener("submit", function(e) {
            e.preventDefault();
 
            const checkedServices = document.querySelectorAll('.service-chk:checked');
            let servicesArray = [];
            checkedServices.forEach((checkbox) => {
                servicesArray.push(checkbox.value);
            }); 
            document.getElementById('selected_services').value = servicesArray.join(", ");
 
            const statusMsg = document.getElementById("status-message");
            const btn = document.getElementById("submitBtn");
            const originalBtnText = btn.innerText;

            btn.innerText = "Sending...";
            btn.disabled = true;
            statusMsg.innerText = "";
 
            emailjs.sendForm("service_kkw0omk", "template_t4n5g19", this)
                .then(() => {
                    statusMsg.innerText = "✅ Inquiry Sent Successfully!";
                    statusMsg.className = "success-msg";
                    this.reset();
                })
                .catch((err) => {
                    statusMsg.innerText = "❌ Failed to send. Check internet connection.";
                    statusMsg.className = "error-msg";
                    console.error("EmailJS Error:", err);
                })
                .finally(() => {
                    btn.innerText = originalBtnText;
                    btn.disabled = false;
                });
        });
 
