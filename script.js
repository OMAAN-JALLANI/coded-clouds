
  function createInfiniteScroll(rowElement, speed, direction = 1) {
    let pos = 0; // starting translateX value

    function step() {
      // move
      pos += speed * direction;
      rowElement.style.transform = `translateX(${pos}px)`;

      const firstChild = rowElement.children[0];
      const lastChild = rowElement.children[rowElement.children.length - 1];
      const rowRect = rowElement.getBoundingClientRect();
      const firstRect = firstChild.getBoundingClientRect();
      const lastRect = lastChild.getBoundingClientRect();

      // Direction: 1 = left ➝ right
      if (direction === 1) {
        // agar first image poori right side se bahar chali jaye
        if (firstRect.right < 0) {
          // usko end pe bhej do
          rowElement.appendChild(firstChild);
          // position ko adjust karo taake jump na aaye
          pos += firstRect.width + 40; // 40 = gap
          rowElement.style.transform = `translateX(${pos}px)`;
        }
      } else {
        // direction = -1, right ➝ left
        if (lastRect.left > window.innerWidth) {
          // last ko start pe le aao
          rowElement.insertBefore(lastChild, rowElement.children[0]);
          // adjust position
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

    // tez speed rakh raha hoon, change kar sakta hai (1, 2, 3...)
    createInfiniteScroll(rowLeft, 1.5, 1);   // left ➝ right
    createInfiniteScroll(rowRight, 1.5, -1); // right ➝ left
  });
 

  document.addEventListener("DOMContentLoaded", function () {
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const viewLessBtn = document.getElementById("viewLessBtn");
    const extraServices = document.querySelectorAll(".extra-service");

    viewMoreBtn.addEventListener("click", function () {
      extraServices.forEach(card => {
        card.classList.remove("d-none");   // show all remaining cards
      });
      viewMoreBtn.classList.add("d-none"); // hide "View More"
      viewLessBtn.classList.remove("d-none"); // show "View Less"
    });

    viewLessBtn.addEventListener("click", function () {
      extraServices.forEach(card => {
        card.classList.add("d-none");     // hide extra cards
      });
      viewLessBtn.classList.add("d-none"); // hide "View Less"
      viewMoreBtn.classList.remove("d-none"); // show "View More"
    });
  });
 
