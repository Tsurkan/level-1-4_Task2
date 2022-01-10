function DataTable(config) {
    // тут в принципе то же самое что и на прошлом уровне было
    // только теперь если не приходит параметр data, то нужно проверить,
    // возможно в конфиге есть поле apiUrl
    // и тогда данные нужно брать оттуда

    let url = config.apiUrl;
    fetch(url).then(response => response.json()).then(data => {
    
        let parent = document.querySelector(config1.parent);
        let table = document.createElement('table');

        let head_tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerHTML = "ID";
        head_tr.appendChild(th);

        for (let i = 0; i < config.columns.length; i++) {
            let th = document.createElement('th');
            th.innerHTML = config.columns[i].title;
            head_tr.appendChild(th);
        }
        table.appendChild(head_tr);
        
        for (key in data.data) {
            let tr = document.createElement('tr');

            //Добавим в первый столбец id
            let td1 = document.createElement('td');
            td1.innerHTML = key;
            tr.appendChild(td1);

            for (let j = 0; j < config.columns.length; j++) {
                let td = document.createElement('td');
                // По ссылкам нет картинкок(
                // if (data.data[key][config.columns[j].value].startsWith('https://')) {
                //     let img = document.createElement('img');
                //     img.src = data.data[key][config.columns[j].value];
                //     td.appendChild(img);
                // }
                if (j != config.columns.length - 1) {
                    td.innerHTML = data.data[key][config.columns[j].value]
                } 
                //Добавим кнопку удаления
                else {
                    let deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = 'Удалить'
                    deleteBtn.style.color = 'red';
                    deleteBtn.setAttribute('data-id', key);
                    td.appendChild(deleteBtn);

                    //Вешаем событье на каждую кнопку
                    deleteBtn.addEventListener('click', (e) => {
                        let id = e.target.dataset.id;
                        fetch('https://mock-api.shpp.me/mtsurkan/users/' + id, 
                        {
                            method: 'DELETE'
                        }).then(() => {
                            window.location.reload(); // Как сделать без перезакрузки?
                        });
                    });
                }
                tr.appendChild(td)
            }
            table.appendChild(tr);
        }
        parent.appendChild(table);
    })
   
}
 
const config1 = {
    parent: '#usersTable',
    columns: [
     {title: 'Имя', value: 'name'},
     {title: 'Фамилия', value: 'surname'},
     {title: 'Аватар', value: 'avatar'},
     {title: 'День рождение', value: 'birthday'},
     {title: 'Действия', value: 'actions'},
   ],
   apiUrl: "https://mock-api.shpp.me/mtsurkan/users"
};
 
DataTable(config1);