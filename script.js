const elements = {
  columns: document.getElementById("columns"),
  nextBtn: document.getElementById("nextBtn"),
  step1: document.getElementById("step1"),
  step2: document.getElementById("step2"),
  step3: document.getElementById("step3"),
  tableHeader: document.getElementById("tableHeader"),
  tableBody: document.getElementById("tableBody"),
  dynamicTable: document.getElementById("dynamicTable"),
  addRowBtn: document.getElementById("addRowBtn"),
  generateBtn: document.getElementById("generateBtn"),
  generatedTableContainer: document.getElementById("generatedTableContainer"),
  tableHTML: document.getElementById("tableHTML"),
  copyBtn: document.getElementById("copyBtn"),
  newTableBtn: document.getElementById("newTableBtn"),
  toast: document.getElementById("toast")
};

let columnCount = 0;

elements.nextBtn.addEventListener("click", () => {
  columnCount = parseInt(elements.columns.value);
  if (columnCount > 0) {
    elements.tableHeader.innerHTML = "";
    for (let i = 0; i < columnCount; i++) {
      const th = document.createElement("th");
      const input = document.createElement("input");
      input.type = "text";
      input.value = `Column ${i + 1}`;
      th.appendChild(input);
      elements.tableHeader.appendChild(th);
    }
    elements.step1.classList.add("hidden");
    elements.step2.classList.remove("hidden");
    elements.addRowBtn.click(); // Add first row automatically
  }
});

elements.addRowBtn.addEventListener("click", () => {
  const tr = document.createElement("tr");
  for (let i = 0; i < columnCount; i++) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Row ${elements.tableBody.children.length + 1}, Col ${i + 1}`;
    td.appendChild(input);
    tr.appendChild(td);
  }
  elements.tableBody.appendChild(tr);
});

elements.generateBtn.addEventListener("click", () => {
  const tableClone = elements.dynamicTable.cloneNode(true);

  // Convert header inputs to text
  tableClone.querySelectorAll("th input").forEach(input => {
    input.parentElement.textContent = input.value;
  });

  // Convert cell inputs to text
  tableClone.querySelectorAll("td input").forEach(input => {
    input.parentElement.textContent = input.value;
  });

  elements.generatedTableContainer.innerHTML = "";
  elements.generatedTableContainer.appendChild(tableClone);
  elements.tableHTML.value = tableClone.outerHTML;
  elements.step2.classList.add("hidden");
  elements.step3.classList.remove("hidden");
});

elements.copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(elements.tableHTML.value);
    showToast("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
});

elements.newTableBtn.addEventListener("click", () => {
  elements.tableHTML.value = "";
  elements.step3.classList.add("hidden");
  elements.step1.classList.remove("hidden");
});

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3000);
}
