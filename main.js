window.lj = {};

window.lj.targets = ["to do", "done", "minecraft code", "python"];
window.lj.target_colors = ["rgb(52, 58, 64)", "rgb(0, 123, 255)", "rgb(100, 255, 0)", "rgb(255, 0, 0)"];

window.lj.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.lj.get_list_dom = function () {
    return document.getElementsByClassName("list js-list-content");
};

window.lj.get_list_title = function (list_dom) {
    return list_dom.getElementsByClassName("list-header-name-assist js-list-name-assist")[0].innerText;
};

window.lj.get_list_card_doms = function (list_dom) {
    return list_dom.getElementsByClassName("list-card-title");
};

window.lj.get_card_doms_title = function (card_doms) {
    var return_value = [];

    card_doms.forEach(function(dom){
        return_value.push(dom.innerText);
    });

    return return_value;
};

window.lj.get_target_doms = function () {
    var return_value = [];

    window.lj.get_list_dom().forEach(function(dom){
        window.lj.targets.forEach(function(target_title){
            if (window.lj.get_list_title(dom) == target_title)
            {
                return_value.push(dom);
            }
        });
    });

    return return_value;
};

window.lj.get_target_dom_values = function () {
    var doms = window.lj.get_target_doms();
    var return_value = [];

    doms.forEach(function(dom, i) {
        return_value.push({
            "title": window.lj.get_list_title(dom),
            "cards": window.lj.get_list_card_doms(dom).length,
            "bgc": window.lj.target_colors[i]
        });
    });

    return return_value;
};

var website = window.open("", "");

website.pie_config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [],
            backgroundColor: [],
            label: []
        }],
        labels: []
    },
    options: {
        responsive: true
    }
};

var values = window.lj.get_target_dom_values();

values.forEach(function(v){
    website.pie_config.data.datasets[0].data.push(v['cards']);
    website.pie_config.data.datasets[0].backgroundColor.push(v['bgc']);
    website.pie_config.data.datasets[0].label.push(v['title']);

    website.pie_config.data.labels.push(v['title']);
});

var pip_dom = website.document.createElement("canvas");
pip_dom.id = "chart";

var load_scripts = [
    "https://code.jquery.com/jquery-3.4.1.slim.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/js/bootstrap.min.js",
    "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
]

load_scripts.forEach(function(s) {
    var js_src = website.document.createElement("script");
    js_src.src = s;
    website.document.body.appendChild(js_src);
});

website.document.body.appendChild(pip_dom);

await window.lj.sleep(200);

var ctx = website.document.getElementById('chart').getContext('2d');
website.window.show_chart = new website.Chart(ctx, website.window.pie_config);
