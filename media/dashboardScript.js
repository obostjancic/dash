const vscode = acquireVsCodeApi();

window.addEventListener("load", initDashboardScript);

function initDashboardScript() {
  addClickListenerToClass(".project", e => {
    vscode.postMessage({
      command: "dash.openProject",
      payload: e.currentTarget.getAttribute("data-id"),
    });
  });

  addClickListenerToClass(".create-project", e => {
    vscode.postMessage({
      command: "dash.createProject",
      payload: e.currentTarget.getAttribute("data-id"),
    });
  });

  addClickListenerToClass(".create-group", e => {
    vscode.postMessage({
      command: "dash.createGroup",
      payload: null,
    });
  });

  addClickListenerToClass(".update-group", e => {
    vscode.postMessage({
      command: "dash.updateGroup",
      payload: e.currentTarget.getAttribute("data-id"),
    });
  });

  addClickListenerToClass(".delete-group", e => {
    vscode.postMessage({
      command: "dash.deleteGroup",
      payload: e.currentTarget.getAttribute("data-id"),
    });
  });

  addClickListenerToClass(".update-project", e => {
    vscode.postMessage({
      command: "dash.updateProject",
      payload: e.currentTarget.getAttribute("data-id"),
    });
  });

  addClickListenerToClass(".delete-project", e => {
    console.log("deleting project", e.currentTarget.getAttribute("data-id"));
    vscode.postMessage({
      command: "dash.deleteProject",
      payload: e.currentTarget.getAttribute("data-id"),
    });
  });

  addSearchFilter();
}

function addClickListenerToClass(className, cb) {
  document.querySelectorAll(className).forEach(element =>
    element.addEventListener("click", e => {
      console.log("adding click listener to class", className);
      e.preventDefault();
      e.stopPropagation();
      cb(e);
    })
  );
}

function addSearchFilter() {
  document.querySelector("#search-input").addEventListener("keyup", e => {
    const searchTerm = e.currentTarget.value;
    const projectDivs = document.querySelectorAll(".project");
    projectDivs.forEach(projectDiv => {
      const projectName = projectDiv.querySelector(".project-name").innerText;
      const match = projectName.toLowerCase().includes(searchTerm.toLowerCase().trim());
      if (searchTerm.length === 0 || match) {
        projectDiv.style.display = "flex";
      } else {
        projectDiv.style.display = "none";
      }
    });
  });
}
