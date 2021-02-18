const div = dom.create("<div><span>1</span></div>");
dom.after(test, div);
const div2 = dom.create("<div>2</div>");
dom.append(div, div2);

//div2包住div
dom.wrap(div, div2);

const list = dom.find("#list");
console.log(list);
dom.empty(list);

dom.attr(div2, "some", "1");
console.log(dom.attr(div2, "some"));
dom.text(div2, "ashdui");
dom.html(div2, "<div>333</div>");
dom.style(div2, "border", "1px solid red");
console.log(dom.style(div2, "border"));
dom.style(div2, {"background": "blue"});

dom.class.add(div2, "asd");
console.log(dom.class.has(div2, "asd"));
dom.on(div2, "click", (e) => {
    console.log(e);
});
console.log(dom.parent(div2));
console.log(dom.children(div2));
console.log(dom.siblings(dom.find(".qwe")));
console.log(dom.next(dom.find(".qwe")));
console.log(dom.previous(dom.find(".rr")));
console.log(dom.index(dom.find(".rr")));
dom.each(dom.findAll(".jjj"), node => console.log(dom.children(node)));