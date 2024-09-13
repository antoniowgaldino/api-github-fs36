// 

// ['tiagolimar', 'edmaralbneto', 'angelolustosa', 'Gustavo1701', 'miguelalves10', 'antoniowgaldino', 'breno-oliveira98', 'rafaeoTW4', 'JoaoRoberto1', 'Breno-arauj']

async function fetchRepositories(usernames) {
    const token = 'SEU TOKEN';
    const tbody = document.getElementById('tabela-usuarios');
  
    // Itera sobre cada nome de usuário no array
    usernames.forEach(async (username) => {
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      const userData = await userResponse.json();
  
      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      const repoData = await repoResponse.json();
  
      // Criando a linha de cada usuário
      const row = tbody.insertRow();
  
      // Centralize content in all cells
      for (let i = 0; i < row.cells.length; i++) {
        row.cells[i].style.textAlign = 'center';
      }
  
      const cell1 = row.insertCell(0);
      const img = document.createElement('img');
      img.src = userData.avatar_url;
      img.classList.add('rounded-circle');
      img.style.width = '35px';
      img.style.height = '35px';
      cell1.appendChild(img);
  
      row.insertCell(1).innerText = userData.login;
      // Check if email is available in the API response
      row.insertCell(2).innerText = userData.email ? userData.email : 'Não disponível';
      row.insertCell(3).innerText = repoData.length;
  
      const cell5 = row.insertCell(4);
      const link = document.createElement('a');
      link.href = userData.html_url;
      link.innerText = 'Ver Perfil';
      cell5.appendChild(link);
    });
  
    // Ordenar os usuários por número de repositórios
    const usersData = Array.from(tbody.querySelectorAll('tr')) // Convert rows to array
      .map(row => ({ // Create objects with user data
        login: row.cells[1].innerText,
        email: row.cells[2].innerText,
        repos: parseInt(row.cells[3].innerText), // Convert number of repos to integer
        link: row.cells[4].querySelector('a').href
      }))
      .sort((a, b) => a.repos - b.repos); // Sort by number of repositories
  
    // Clear table content and rebuild with sorted data
    tbody.innerHTML = '';
    usersData.forEach(user => {
      const row = tbody.insertRow();
      for (let i = 0; i < row.cells.length; i++) {
        row.cells[i].style.textAlign = 'center';
        row.cells[i].innerText = user[Object.keys(user)[i]]; // Set cell content from object properties
      }
    });
  }
  
  // Usernames list
  const usernames = ['tiagolimar', 'edmaralbneto', 'angelolustosa', 'Gustavo1701', 'miguelalves10', 'antoniowgaldino', 'breno-oliveira98', 'rafaeoTW4', 'JoaoRoberto1', 'Breno-arauj'];
  
  fetchRepositories(usernames);