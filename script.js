var form = document.getElementById("myForm")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var search = document.getElementById("search").value

    var name = search.split(' ').join('')

    document.getElementById("profile").innerHTML = ""
    document.getElementById("repos").innerHTML = ""

    fetch("https://api.github.com/users/" + name)
        .then((result) => result.json())
        .then((data) => {
            document.getElementById("profile").innerHTML = `
            <aside>
                <a target="_blank" href="https://www.github.com/${name}"><img src="${data.avatar_url}"/></a>
                <h3>${data.login}</h3>
                <p class="grey-text bio">${data.bio}</p>
                <p>📍${data.location}</p>
            </aside>
        `
        })

    fetch("https://api.github.com/users/" + name + "/repos")
        .then((result) => result.json())
        .then((data) => {
            var div1 = document.getElementById("repos");
            data.forEach(element => {
                let pinnedRepoWrap = document.createElement('div');
                pinnedRepoWrap.setAttribute('class', 'pinned-repo-wrapper');
                let pinnedRepo = document.createElement('div');
                pinnedRepo.setAttribute('class', 'pinned-repo');
                pinnedRepo.innerHTML = `
                    <a "target="_blank" href="https://www.github.com/${element.full_name}"><h4>${element.name}</h4></a>
                    <p>Description ${element.description}</p>
                `
                div1.append(pinnedRepoWrap);
                pinnedRepoWrap.append(pinnedRepo);
            });
        })
})
