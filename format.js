function formatElement(elemId) {
    let el = document.getElementById(elemId);
    el.innerHTML = el.innerHTML.split("\n").map(line => formatLine(line)).join("\n");
}

function formatLine(str) {
    let output = str;
    let addClass = "";
    let needClosingUnderscore = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '[' || str[i] == '{' || (!needClosingUnderscore && str[i] == '_')) {
            switch (str[i+1]) {
                case 'R': addClass = " class='red'"; break;
                case 'B': addClass = " class='blue'"; break;
                case 'G': addClass = " class='green'"; break;
                case 'T': addClass = " class='transp'"; break;
                default:  addClass = ""; break;
            }
                 if (str[i] == '[') { output = output.replace(/\[[RGBT]?/,    "<b"+addClass+">"); }
            else if (str[i] == '{') { output = output.replace(/\{[RGBT]?/, "<span"+addClass+">"); }
            else if (str[i] == '_') { output = output.replace(/_[RGBT]?/,"<small"+addClass+">"); needClosingUnderscore = true; }
            
        }
        else if (str[i] == ']') { output = output.replace(/\]/,    "</b>"); }
        else if (str[i] == '}') { output = output.replace(/\}/, "</span>"); }
        else if (str[i] == '_') { output = output.replace(/_/, "</small>"); needClosingUnderscore = false; }
        else if (str[i] == '|') { output = output.replace(/\|/,    "</p><p>"); }
        else if (str[i] == '¦') { output = output.replace(/\¦/,    "</p><p class='note'>"); }
        else if (str[i] == 'Ø') { output = output.replace(/Ø/,"&NoBreak;"); }
    }
    return output;
}


function init() {
    populateNounTable("human");
    populateNumTable("num");
    formatElement("table_nouns");
    formatElement("table_numerals");
}

function populateNounTable(id) {
    for (let i = 0; i < wordlist[id].length; i++) {
        let tr = document.createElement("tr");

        let td_pt_dim_art = document.createElement("td"), td_pt_dim = document.createElement("td");
        let td_pt_aug_art = document.createElement("td"), td_pt_aug = document.createElement("td");
        let td_pt_art     = document.createElement("td"), td_pt     = document.createElement("td");
        let td_nl_dim_art = document.createElement("td"), td_nl_dim = document.createElement("td");
        let td_nl_pl_art  = document.createElement("td"), td_nl_pl  = document.createElement("td");
        let td_nl_art     = document.createElement("td"), td_nl     = document.createElement("td");
        tr.appendChild(td_pt_dim_art); tr.appendChild(td_pt_dim); tr.appendChild(td_pt_aug_art); tr.appendChild(td_pt_aug);
        tr.appendChild(td_pt_art);     tr.appendChild(td_pt);     tr.appendChild(td_nl_art);     tr.appendChild(td_nl);
        /*tr.appendChild(td_nl_pl_art);*/  tr.appendChild(td_nl_pl);  tr.appendChild(td_nl_dim_art); tr.appendChild(td_nl_dim);

        if ("section" in wordlist[id][i]) tr.classList.add("section");
        td_pt_dim_art.classList.add("article","pt","hideNarrow");       td_pt_aug_art.classList.add("article","pt","hideNarrow");
        td_pt_dim    .classList.add(          "pt","hideNarrow");       td_pt_aug    .classList.add(          "pt","hideNarrow");
        td_pt_art.classList.add("article","maincol","pt"); td_nl_art.classList.add("article","maincol","nl");
        td_pt        .classList.add("maincol","pt");       td_nl        .classList.add("maincol","nl");
        td_nl_dim_art.classList.add("article","nl");       td_nl_pl_art .classList.add("article","nl");
        td_nl_dim    .classList.add(          "nl");       td_nl_pl     .classList.add(          "nl");

        td_pt_art    .innerHTML = "<div><p>" + formatLine(wordlist[id][i].pt[0]) + "</p></div>";
        td_pt        .innerHTML = "<div><p>" + formatLine(wordlist[id][i].pt[1]) + "</p></div>";
        td_pt_dim_art.innerHTML = "<div><p>" + formatLine(wordlist[id][i].pt[2]) + "</p></div>";
        td_pt_dim    .innerHTML = "<div><p>" + formatLine(wordlist[id][i].pt[3]) + "</p></div>";
        td_pt_aug_art.innerHTML = "<div><p>" + formatLine(wordlist[id][i].pt[4]) + "</p></div>";
        td_pt_aug    .innerHTML = "<div><p>" + formatLine(wordlist[id][i].pt[5]) + "</p></div>";

        td_nl_art    .innerHTML = "<div><p>" + formatLine(wordlist[id][i].nl[0]) + "</p></div>";
        td_nl        .innerHTML = "<div><p>" + formatLine(wordlist[id][i].nl[1]) + "</p></div>";
        td_nl_pl_art .innerHTML = "<div><p>" + formatLine(wordlist[id][i].nl[2]) + "</p></div>";
        td_nl_pl     .innerHTML = "<div><p>" + formatLine(wordlist[id][i].nl[3]) + "</p></div>";
        td_nl_dim_art.innerHTML = "<div><p>" + formatLine(wordlist[id][i].nl[4]) + "</p></div>";
        td_nl_dim    .innerHTML = "<div><p>" + formatLine(wordlist[id][i].nl[5]) + "</p></div>";

        if (!wordlist[id][i].pt[4].length) {
            td_pt_aug_art.classList.add("hidden");
            td_pt_dim.colSpan = 2;
        }
        if (!wordlist[id][i].nl[4].length) {
            td_nl_dim_art.classList.add("hidden");
            td_nl_pl.colSpan = 2;
        }

        document.querySelector("#table_nouns tbody").appendChild(tr);
    }
}
function populateNumTable(id) {
    for (let i = 0; i < wordlist_num[id].length; i++) {
        let tr = document.createElement("tr");

        let td_pt_car = document.createElement("td"), td_nl_car = document.createElement("td");
        let td_pt_ord = document.createElement("td"), td_nl_ord = document.createElement("td"), td_nl_en = document.createElement("td");
        tr.appendChild(td_pt_ord); tr.appendChild(td_pt_car); tr.appendChild(td_nl_car); tr.appendChild(td_nl_ord); tr.appendChild(td_nl_en);

        if ("section" in wordlist_num[id][i]) tr.classList.add("section");
        td_pt_ord.classList.add("pt","hideNarrow"); td_pt_car.classList.add("maincol","pt");
        td_nl_ord.classList.add("nl"); td_nl_car.classList.add("maincol","nl"); td_nl_en.classList.add("nl");

        if (!wordlist_num[id][i].nl[2].length) {
            td_nl_en.classList.add("hidden");
            td_nl_ord.colSpan = 2;
        }

        td_pt_car.innerHTML = "<div><p>" + formatLine(wordlist_num[id][i].pt[0]) + "</p></div>";
        td_pt_ord.innerHTML = "<div><p>" + formatLine(wordlist_num[id][i].pt[1]) + "</p></div>";

        td_nl_car.innerHTML = "<div><p>" + formatLine(wordlist_num[id][i].nl[0]) + "</p></div>";
        td_nl_ord.innerHTML = "<div><p>" + formatLine(wordlist_num[id][i].nl[1]) + "</p></div>";
        td_nl_en.innerHTML = "<div><p>" + formatLine(wordlist_num[id][i].nl[2]) + "</p></div>";

        document.querySelector("#table_numerals tbody").appendChild(tr);
    }
}
wordlist_num = {
"num": [
{ pt: ["[um], [u]ma","prim[ei]ro"],  nl: ["[ee]n, [éé]n¦(always pronounced with long ee;¦accents are for disambiguation)","eerste","enen, eentje"], section: true },
{ pt: ["d[oi]s, duas","seg[un]do"],                                     nl: ["tw[ee]","tweede","tweeën, tweetjes"] },
{ pt: ["tr[ê]s","terc[ei]ro"],                                            nl: ["dr[ie]","derde","drieën, drietjes"] },
{ pt: ["q[ua]tro","q[ua]rto"],                                          nl: ["v[ie]r","vierde","vieren, viertjes"] },
{ pt: ["c[in]co","qu[in]to"],                                           nl: ["v[ij]f","vijfde","vijven"] },
{ pt: ["s[ei]s","s[e]xto"],                                             nl: ["z[e]s","zesde","zessen"] },
{ pt: ["s[e]te","s[é]timo"],                                            nl: ["z[e]·ven","zevende","zevenen"] },
{ pt: ["[oi]to","oit[a]vo"],                                            nl: ["[a]cht","achtste","achten"] },
{ pt: ["n[ɔ]ve","n[o]no, nov[e]no"],                                    nl: ["n[e]·gen","negende","negenen"] },
{ pt: ["d[e]z","d[é]cimo"],                                             nl: ["t[ie]n","tiende","tienen"], section: true  },
{ pt: ["[o]nze","décimo primeiro|undécimo, onzeno"],                    nl: ["[e]lf¦pronounced ellₑf by some","elfde","elven"] },
{ pt: ["d[o]ze","décimo segundo|duodécimo, dozeno"],                    nl: ["tw[aa]lf¦pronounced twaalₑf by some","twaalfde","twaalven"] },
{ pt: ["tr[e]ze","décimo terceiro|tredécimo, trezeno"],                 nl: ["d[e]r·tien","dertiende","dertienen"] },
{ pt: ["cat[o]rze, quat[o]rze","décimo quarto|catorzeno, quatorzeno"],  nl: ["v[ee]r·tien","veertiende","veertienen"] },
{ pt: ["qu[in]ze","décimo quinto"],                                     nl: ["v[ij]f·tien","vijftiende","vijftienen"] },
{ pt: ["dezess[ei]s","décimo sexto"],                                   nl: ["z[e]s·tien","zestiende","zestienen"] },
{ pt: ["dezess[e]te","décimo sétimo"],                                  nl: ["z[e]·ven·tien","zeventiende","zeventienen"] },
{ pt: ["dez[oi]to","décimo oitavo"],                                    nl: ["[a]cht·tien","achttiende","achttienen"] },
{ pt: ["dezen[ɔ]ve","décimo nono"],                                     nl: ["n[e]·gen·tien","negentiende","negentienen"] },
{ pt: ["v[in]te","vig[é]simo"],                                         nl: ["tw[i]n·tig","twintigste","twintigen"], section: true },
{ pt: ["vinte e [um]","vigésimo primeiro"],                             nl: ["[ee]n·en·twin·tig","_eenentwintigste_","_eenentwintigen_"] },
{ pt: ["vinte e d[oi]s","vigésimo segundo"],                            nl: ["tw[ee]·ën·twin·tig","_tweeëntwintigste_","_tweeëntwintigen_"] },
{ pt: ["vinte e tr[ê]s","vigésimo terceiro"],                           nl: ["dr[ie]·ën·twin·tig","_drieëntwintigste_","_drieëntwintigen_"] },
{ pt: ["vinte e q[ua]tro","vigésimo quarto"],                           nl: ["v[ie]r·en·twin·tig","_vierentwintigste_","_vierentwintigen_"] },
{ pt: ["vinte e c[in]co","vigésimo quinto"],                            nl: ["v[ij]f·en·twin·tig","_vijfentwintigste_","_vijfentwintigen_"] },
{ pt: ["vinte e s[ei]s","vigésimo sexto"],                              nl: ["z[e]s·en·twin·tig","_zesentwintigste_","_zesentwintigen_"] },
{ pt: ["vinte e s[e]te","vigésimo sétimo"],                             nl: ["z[e]·ven·en·twin·tig","_zevenentwintigste_","_zevenentwintigen_"] },
{ pt: ["vinte e [oi]to","vigésimo oitavo"],                             nl: ["[a]cht·en·twin·tig","_achtentwintigste_","_achtentwintigen_"] },
{ pt: ["vinte e n[ɔ]ve","vigésimo nono"],                               nl: ["n[e]·gen·en·twin·tig","_negenentwintigste_","_negenentwintigen_"] },
{ pt: ["tr[in]ta","trig[é]simo"],                                       nl: ["d[e]r·tig","dertigste","dertigen"], section: true },
{ pt: ["quar[en]ta","quadrag[é]simo"],                                  nl: ["v[ee]r·tig","veertigste","veertigen"] },
{ pt: ["cinq[{Ru}en]ta","quinquag[é]simo"],                             nl: ["v[ij]f·tig","vijftigste","vijftigen"] },
{ pt: ["sess[en]ta","se{Bx}ag[é]simo"],                                 nl: ["z[e]s·tig","zestigste","zestigen"] },
{ pt: ["set[en]ta","septuag[é]simo"],                                   nl: ["z[e]·ven·tig","zeventigste","zeventigen"] },
{ pt: ["oit[en]ta","octog[é]simo"],                                     nl: ["t[a]ch·tig","tachtigste","tachtigen"] },
{ pt: ["nov[en]ta","nonag[é]simo"],                                     nl: ["n[e]·gen·tig","negentigste","negentigen"] },
{ pt: ["c[em]","cent[é]simo"],                                          nl: ["h[o]n·derd","honderdste","honderden"], section: true },
{ pt: ["cento e [um]","centésimo primeiro"],                            nl: ["hon·derd·(en)·[ee]n","honderd(en)eerste",""] },
{ pt: ["cento e d[oi]s","centésimo segundo"],                           nl: ["hon·derd·(en)·tw[ee]","honderd(en)tweede",""] },
{ pt: ["cento e tr[ê]s","centésimo terceiro"],                          nl: ["hon·derd·(en)·dr[ie]","honderd(en)derde",""] },
{ pt: ["cento e d[o]ze","_centésimo décimo segundo_|_centésimo duodécimo/dozeno_"],nl: ["hon·derd·(en)·tw[aa]lf","honderd(en)twaalfde",""] },
{ pt: ["cento e vinte e c[in]co","_centésimo vigésimo quinto_"],        nl: ["hon·derd·v[ij]f·en·twintig","honderdvijfentwintigste",""] },
{ pt: ["duz[e]ntos","ducent[é]simo"],                                   nl: ["tw[ee]·hon·derd","tweehonderdste",""] },
{ pt: ["trez[e]ntos","_trecent[é]simo / tricent[é]simo_"],                nl: ["dr[ie]·hon·derd","driehonderdste",""] },
{ pt: ["quatroc[e]ntos","quadringent[é]simo"],                          nl: ["v[ie]r·hon·derd","vierhonderdste",""] },
{ pt: ["quinh[e]ntos","quingent[é]simo"],                               nl: ["v[ij]f·hon·derd","vijfhonderdste",""] },
{ pt: ["seisc[e]ntos","_sexcent[é]simo / seiscent[é]simo_"],              nl: ["z[e]s·hon·derd","zeshonderdste",""] },
{ pt: ["setec[e]ntos","se(p)tingent[é]simo"],                           nl: ["z[e]·ven·hon·derd","zevenhonderdste",""] },
{ pt: ["oitoc[e]ntos","octingent[é]simo"],                              nl: ["[a]cht·hon·derd","achthonderdste",""] },
{ pt: ["novec[e]ntos","non(in)gent[é]simo"],                            nl: ["n[e]·gen·hon·derd","negenhonderdste",""] },
{ pt: ["m[il]","mil[é]simo"],                                           nl: ["d[ui]·zend","duizendste","duizenden"], section: true },
{ pt: ["mil e [um]","milésimo primeiro"],                               nl: ["dui·zend (en) [ee]n","duizend (en) eerste",""] },
{ pt: ["mil e d[oi]s","milésimo segundo"],                              nl: ["dui·zend (en) tw[ee]","duizend (en) tweede",""] },
{ pt: ["mil e tr[ê]s","milésimo terceiro"],                             nl: ["dui·zend (en) dr[ie]","duizend (en) derde",""] },
{ pt: ["d[oi]s mil","segundo milésimo"],                                nl: ["tw[ee]·dui·zend","tweeduizendste",""] },
{ pt: ["tr[ê]s mil","terceiro milésimo"],                               nl: ["dr[ie]·dui·zend","drieduizendste",""] },
{ pt: ["d[e]z mil","décimo milésimo"],                                  nl: ["t[ie]n·dui·zend","tienduizendste",""] },
{ pt: ["c[e]m mil","centésimo milésimo"],                               nl: ["h[o]n·derd·dui·zend","honderdduizendste",""] },
{ pt: ["um milh[ão]","milion[é]simo"],                                  nl: ["een mil·j[oe]n","miljoenste",""] },
{ pt: ["um bilh[ão]","bilion[é]simo"],                                  nl: ["een mil·j[a]rd","miljardste",""] },
{ pt: ["um trilh[ão]","trilion[é]simo"],                                nl: ["een bil·j[oe]n","biljoenste",""] },
{ pt: ["um quatrilh[ão]","quatrilion[é]simo"],                          nl: ["een bil·j[a]rd","biljardste",""] },
{ pt: ["um quintilh[ão]","quintilion[é]simo"],                          nl: ["een tril·j[oe]n","triljoenste",""] },
{ pt: ["um sextilh[ão]","sextilion[é]simo"],                            nl: ["een tril·j[a]rd","triljardste",""] },
{ pt: ["um septilh[ão]","septilion[é]simo"],                            nl: ["een quadril·j[oe]n","quadriljoenste",""] },
{ pt: ["z[e]ro","zer[é]simo"],                                          nl: ["n[u]l","nulde",""], section: true },
{ pt: ["nenh[um]",""],                                                  nl: ["g[ee]n","",""] },
]

};
wordlist_phrase = {
"amount": [
{ pt: ["nenh[um]",""],                                                  nl: ["g[ee]n","",""] },
{ pt: ["q[ua]se nenh[um]",""],                                          nl: ["b[ij]·na g[ee]n","",""] },
{ pt: ["t[o]do(s)",""],                                                 nl: ["[a]l, [a]lle, [a]lles, [a]llemaal","",""], section: true },
{ pt: ["t[o]do",""],                                                    nl: ["[a]l de/het ...|[a]l·le ...|[a]l·les _everything_|al·le·m[aa]l _all of them/us/you","","allen"] },
{ pt: ["[am]bos, os d[oi]s",""],                                        nl: ["b[ei]·de ...|al·le·b[ei] de ...|b[ei]·de, al·le·b[ei] _on its own_|b[ei]den _on its own, for people_","",""] },
{ pt: ["os tr[ê]s",""],                                                 nl: ["[a]l·le drie (de)","",""] },
{ pt: ["(todos) os q[ua]tro",""],                                       nl: ["[a]l·le vier (de)","",""] },
{ pt: ["m[ui]to, bast[an]te",""],                                       nl: ["v[ee]l, een h[oo]p, (h[ee]l) [e]rg","",""], section: true },
{ pt: ["tenho [muitos] {T(deles)}|tenho [muitíssimos] {T(deles)}",""],  nl: ["ik heb er [veel]|ik heb er [(heel / erg) veel]|ik heb er [heel erg veel]","",""] },
{ pt: ["bebo [muito]",""],                                         nl: ["ik drink [veel]|ik drink [(heel / erg) veel]|ik drink [heel erg veel]","",""] },
{ pt: ["{Gm[ui]tas} coisas",""],                                        nl: ["{G(h[ee]l _and/or_ [e]rg) v[ee]l} d[i]ngen","","velen"] },
{ pt: ["me div[i]rto {Gm[ui]to}",""],                                   nl: ["ik verm[aa]k me {G(h[ee]l) [e]rg}","",""] },
{ pt: ["p[ou]co",""],                                                   nl: ["w[ei]·nig","","weinigen"] },
{ pt: ["um p[ou]co",""],                                                nl: ["een b[ee]t·je","",""] },
]

};

wordlist = {
"human":[
{ pt: ["o","(ser) hum[a]no","","humaninho","","humanão"],               nl: ["de","m[e]ns","","mensen","","mensje"], section: true },
{ pt: ["Ø|as","g[e]nte|pess[o]as","","","",""],                         nl: ["de","m[e]n·sen","","","de","mensjes"] },
{ pt: ["a","pess[o]a","","pessoinha","","pessoazona"],                  nl: ["de|de","m[e]ns|per·s[oo]n","","mensen|personen","","mensje|persoontje"] },
{ pt: ["o","h[o]mem","","hom(enz)inho","","homenz(arr)ão"],             nl: ["de","m[a]n","","mannen","","mannetje¦also: male animal"] },
{ pt: ["a","mulh[e]r","","mulher(z)inha","a|{Ro}","mulherona|mulherão"],nl: ["de","vr[ouw]","","vrouwen","","vrouwtje¦also: female animal"] },
{ pt: ["a","cri[a]nça","","criancinha","a|{Ro}","criançona|crianção"],  nl: ["het","k[i]nd","","kind{Ber}en","het|de","kindje|kind{Ber}tjes"] },
{ pt: ["o","men[i]no","","menininho","","meninão"],                     nl: ["de","j[o]ngen","","jongens","","jong{Betje}"] },
{ pt: ["a","men[i]na","","menininha","","meninona"],                    nl: ["{Rhet}","m[ei]sje","","meisjes","",""] },

{ pt: ["o","c[To]rpo","","corpinho","","corpão"],                       nl: ["het","l[i]chaam","","lichamen","","lichaampje"], section: true },
{ pt: ["o","br[a]ço","","bracinho","","bração"],                        nl: ["de","[a]rm","","armen","","armpje"] },
{ pt: ["a","p[e]rna","","perninha","{Ro}","pernão"],                    nl: ["het","b[ee]n","","benen","","beentje"] },
{ pt: ["o|o","tr[o]nco|t[o]rso","","tronquinho","","troncão"],          nl: ["de","t[o]r·so","","torso's","","torsootje"] },
{ pt: ["o","p[ei]to","","peitinho","","peitão"],                        nl: ["de","b[o]rst·(kas)","","borst(kass)en","","borst(kas)je"] },
{ pt: ["o|a|a","s[ei]o|m[a]ma|t[e]ta _(vulgar)_","","seiozinho|maminha|tetinha","","sei(oz)ão|mamazona|tetão"],nl: ["de|de","b[o]rst|t[ie]t _(vulgar)_","","borsten|tieten","","borstje|tietje"] },
{ pt: ["as","c[ɔ]stas","","costinhas","","costonas"],                            nl: ["de","r[u]g","","ruggen","","rugje|ruggetje"] },
{ pt: ["a|o","barr[i]ga|abd[ô]men","","barriguinha|Ø","","barrigona|Ø"],         nl: ["de","b[ui]k","","buiken","","buikje"] },
{ pt: ["a","n[á]dega","","nadeguinha","","nadegona"],                   nl: ["de","b[i]l","","billen","","billetje"] },
{ pt: ["a|o","b[u]nda _(informal)_|bumb[u]m _(euph.)_","","bundinha|bumbunzinho","a|{Ro}|o","bundona|bundão|bumbunzão"],  nl: ["de|de","k[o]nt _(informal)_|b[i]ps _(euphemism)_","","konten|bipsen","","kontje|bipsje"] },
{ pt: ["o|o","m[e]mbro|m[e]mbro (vir[il])","","membrinho","","membrão"],  nl: ["de|het","l[e]·de·maat|(m[a]nnelijk) l[i]d","","ledematen|l{Re}den","","ledemaatje|lidje"] },

{ pt: ["a","cab[e]ça","","cabecinha","","cabeçona"],            nl: ["het","h[oo]fd","","hoofden","","hoofdje"], section: true },
{ pt: ["a","t[e]sta","","testinha","","testona"],               nl: ["het","v[oo]r·hoofd","","voorhoofden","","voorhoofdje"] },
{ pt: ["a","c[a]ra","","carinha","","carona"],                  nl: ["het","ge·z[i]cht","","gezichten","","gezichtje"] },
{ pt: ["o","[To]lho","","olhinho","","olhão"],                  nl: ["het","[oo]g","","ogen","","oogje"] },
{ pt: ["a","or[e]lha","","orelhinha","{Ro}","orelhão"],         nl: ["het","[oo]r","","oren","","oortje"] },
{ pt: ["o","ouv[i]do","","ouvidinho","","ouvidão"],             nl: ["het|het","[oo]r·(gat) _👂_|ge·h[oo]r _🧏_","","oorg{Ra}ten|Ø","","oorg{Raa}tje|Ø"] },
{ pt: ["o","nar[i]z","","narizinho","","narigão"],              nl: ["de","n[eu]s","","neuzen","","neusje"] },
{ pt: ["a","b[o]ca","","boquinha","a|{Ro}","bocona|bocão"],     nl: ["de|de","m[o]nd|b[e]k _(vulgar)_","","monden|bekken","","mondje|bekje"] },
{ pt: ["o|o","l[á]bio|b[ei]ço","","labiozinho|beicinho","","labião|beição"],nl: ["de","l[i]p","","lippen","","lipje"] },
{ pt: ["o","qu[ei]xo","","queixinho","","queixão"],             nl: ["de","k[i]n","","kinnen","","kinnetje"] },
{ pt: ["a","garg[a]nta","","gargantinha","","gargantona"],      nl: ["de|de","k[ee]l|h[a]ls","","kelen|halzen","","keeltje|halsje"] },
{ pt: ["o","pesc[To]ço","","pescocinho","","pescoção"],         nl: ["de|de","n[e]k|h[a]ls","","nekken|halzen","","nekje|halsje"] },

{ pt: ["a","m[ão]","","mãozinha|mãozita","","mãozona"], nl: ["de","h[a]nd","","handen","","handje"], section: true  },
{ pt: ["o","d[e]do _(da mão)_","","dedinho","","dedão"],        nl: ["de","v[i]nger","","vingers","","vingertje"] },
{ pt: ["o|o","ded[ão] _(da mão)_|_(d[e]do)_ poleg[a]r","","dedãozinho|Ø","","dedãozão|Ø"],        nl: ["de","d[ui]m","","duimen","","duimpje"] },
{ pt: ["o","_(d[e]do)_ indicad[o]r","","","",""],        nl: ["de","w[ij]s·vinger","","wijsvingers","","wijsvingertje"] },
{ pt: ["o","_d[e]do_ m[é]dio","","","",""],        nl: ["de","m[i]d·del·vinger","","middelvingers","","middelvingertje"] },
{ pt: ["o|o","_(d[e]do)_ anul[a]r|_(d[e]do)_ anel[a]r","","","",""],        nl: ["de","r[i]ng·vinger","","ringvingers","","ringvingertje"] },
{ pt: ["o","ded[i]nho _(da mão)_","","","",""],        nl: ["de","p[i]nk","","pinken","","pinkje"] },
{ pt: ["o","p[u]lso","","pulsinho","","pulsão"],        nl: ["de","p[o]ls","","polsen","","polsje"] },
{ pt: ["o","p[u]nho","","punhinho","","punhão"],        nl: ["de","v[ui]st","","vuisten","","vuistje"] },

{ pt: ["o","p[é]","","pezinho","","pezão"],             nl: ["de","v[oe]t","","voeten","","voetje"], section: true  },
{ pt: ["o","d[e]do _(do pé)_","","dedinho","","dedão"],        nl: ["de","t[ee]n","","tenen","","teentje"] },
{ pt: ["o","ded[ão] _(do pé)_","","dedãozinho","","dedãozão"],        nl: ["de","gr[o]·te t[ee]n","","grote tenen","","grote teentje"] },
{ pt: ["o","ded[i]nho _(do pé)_","","","",""],        nl: ["de","kl[ei]·ne t[ee]n","","kleine tenen","","kleine teentje"] },
{ pt: ["o","tornoz[e]lo","","tornozelinho","","tornozelão"],        nl: ["de","[e]n·kel","","enkels","","enkeltje"] },
{ pt: ["a|a","pl[a]nta do p[é]|s[ɔ]la","","Ø|solinha","","Ø|solona"],        nl: ["de","(v[oe]t)·zool","","(voet)zolen","","(voet)zooltje"] },
],

"shape":[
{ pt: ["a","f[ɔ]rma","","forminha","","formona"],      nl: ["de","v[o]rm","","vormen","","vormpje"], section: true },
{ pt: ["o|a","c[í]rculo|r[ɔ]da","","circulinho|rodinha","","circulão|rodona"],  nl: ["de|de|het","c[i]r·kel|kr[i]ng|r[o]nd·je","","cirkels|kringen|rondjes","","cirkeltje|kringetje|Ø"] },
{ pt: ["o","quadr[a]do","","quadradinho","","quadradão"],     nl: ["het","v[ie]r·kant","","vierkanten","","vierkantje"] },
{ pt: ["o","ret[â]ngulo","","retangulinho","","retangulão"],     nl: ["de","r[e]cht·hoek","","rechthoeken","","rechthoekje"] },
{ pt: ["o","tri[â]ngulo","","triangulinho","","triangulão"],     nl: ["de","dr[ie]·hoek","","driehoeken","","driehoekje"] },
{ pt: ["o","he{Bx}[á]gono","","hexagoninho","","hexagonão"],     nl: ["de","z[e]s·hoek","","zeshoeken","","zeshoekje"] },
{ pt: ["o","c[u]bo","","cubinho","","cubão"],     nl: ["de","k[u]·bus","","kubussen","","kubusje"] },
{ pt: ["o","c[u]bo de g[e]lo","","cubinho de gelo","","cubão de gelo"],     nl: ["het|het","[ij]s·klont·je|[ij]s·blok·je","","ijsklontjes|ijsblokjes","",""] },
],

"geography":[
{ pt: ["o","pa[í]s","","paisinho","","paisão"],      nl: ["het","l[a]nd","","landen","","landje"], section: true },
{ pt: ["o","quadr[a]do","","quadradinho","","quadradão"],     nl: ["","Nederland","","vierkanten","","vierkantje"] },
{ pt: ["a","geografia","","","",""],      nl: ["de|de","[aa]rd·rijks·kun·de|ge·o·gra·fie","","","",""], section: true },
{ pt: ["o|a","c[í]rculo|r[ɔ]da","","circulinho|rodinha","","circulão|rodona"],  nl: ["de|de|het","c[i]r·kel|kr[i]ng|r[o]nd·je","","cirkels|kringen|rondjes","","cirkeltje|kringetje|Ø"] },
{ pt: ["o","ret[â]ngulo","","retangulinho","","retangulão"],     nl: ["de","r[e]cht·hoek","","rechthoeken","","rechthoekje"] },
{ pt: ["o","tri[â]ngulo","","triangulinho","","triangulão"],     nl: ["de","dr[ie]·hoek","","driehoeken","","driehoekje"] },
{ pt: ["o","he{Bx}[á]gono","","hexagoninho","","hexagonão"],     nl: ["de","z[e]s·hoek","","zeshoeken","","zeshoekje"] },
{ pt: ["o","c[u]bo","","cubinho","","cubão"],     nl: ["de","k[u]·bus","","kubussen","","kubusje"] },
{ pt: ["o","c[u]bo de g[e]lo","","cubinho de gelo","","cubão de gelo"],     nl: ["het|het","[ij]s·klont·je|[ij]s·blok·je","","ijsklontjes|ijsblokjes","",""] },
]
};
