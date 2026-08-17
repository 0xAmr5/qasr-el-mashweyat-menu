const RESTAURANT_WHATSAPP = "201009694831"; // رقم الواتساب المعتمد

const menuData = [
  // --- مشويات على الفحم ---
  { id: 1, category: "مشويات على الفحم", name: "مشكل كباب وكفتة بلدي", priceVal: 420, price: "420 ج.م", description: "كباب ضاني متبل وكفتة مشوية على الفحم تقدم مع سلطات وطحينة وعيش طازج.", image: "./mixed-grill.jpg", tag: "الأكثر طلباً 🔥" },
  { id: 2, category: "مشويات على الفحم", name: "ريش ضاني مشوية فاخرة", priceVal: 490, price: "490 ج.م", description: "ريش ضاني متبلة بتتبيلة القصر الخاصة ومشوية على الجمر مع الخضار المشوي.", image: "./lamb-chops.jpg", tag: "مميز 🥩" },
  { id: 3, category: "مشويات على الفحم", name: "ريش بتلو مشوية", priceVal: 460, price: "460 ج.م", description: "ريش بتلو مشوية على الفحم بتتبيلة روزماري وبهارات شرقية.", image: "./veal-chops.jpg" },
  { id: 4, category: "مشويات على الفحم", name: "طرب بلدي مخصوص", priceVal: 360, price: "360 ج.م", description: "طرب كفتة ضاني ملفوف بمنديل الضاني ومتبل على الفحم يقدم مع طحينة بيضاء.", image: "./tarb-grill.jpg" },
  { id: 5, category: "مشويات على الفحم", name: "كفتة حاتي بلدي مخصوص", priceVal: 290, price: "290 ج.م", description: "كفتة لحم بلدي مشوية على السيخ بالفحم مع بقدونس وبصل وطحينة وعيش.", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=400&q=80", tag: "الأكثر مبيعاً 🍢" },
  { id: 6, category: "مشويات على الفحم", name: "شيش طاووق متبل ع الجمر", priceVal: 160, price: "160 ج.م", description: "أوراك فراخ متبلة بالزبادي والخلطة اللبنانية مع فلفل وبصل مشوي.", image: "./shish-tawook.jpg" },
  { id: 7, category: "مشويات على الفحم", name: "فرخة مشوية على الفحم كاملة", priceVal: 240, price: "240 ج.م", description: "فرخة كاملة متبلة على الطريقة الشرقية مشوية على الفحم مع خلطة بهارات خاصة.", image: "./grilled-chicken.jpg" },
  { id: 8, category: "مشويات على الفحم", name: "سجق بلدي مشوي", priceVal: 190, price: "190 ج.م", description: "سجق بلدي مشوي على الجمر يقدم مع دبس الرمان والطحينة.", image: "./grilled-oriental-sausage.jpg" },
  { id: 9, category: "مشويات على الفحم", name: "نصف فرخة شواية مع أرز بسمتي", priceVal: 155, price: "155 ج.م", description: "نصف دجاجة محمرة تقدم مع أرز بسمتي مبهر بالمكسرات وصوص دقوس.", image: "./rotisserie-chicken-rice.jpg" },
  { id: 10, category: "مشويات على الفحم", name: "صينية مشويات القصر العائلية (VIP)", priceVal: 1150, price: "1150 ج.م", description: "كيلو مشكل كباب وكفتة + فرخة مشوية + ريش ضاني + سيرفيس أرز وسلطات وعيش.", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80", tag: "صينية الملوك 👑" },

  // --- شاورما وصاج ---
  { id: 11, category: "شاورما وصاج", name: "عربي شاورما فراخ سوبر", priceVal: 140, price: "140 ج.م", description: "ساندوتش شاورما فراخ مقطع رول يقدم مع بطاطس مقلية وتومية وخيار مخلل.", image: "./chicken-shawarma-arabi.jpg", tag: "وجبة شائعة 🌯" },
  { id: 12, category: "شاورما وصاج", name: "عربي شاورما لحمة بلدي سوبر", priceVal: 165, price: "165 ج.م", description: "شاورما لحمة بلدي في خبز صاج مقطع رول مع طحينة وبطاطس ومخلل.", image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=400&q=80" },
  { id: 13, category: "شاورما وصاج", name: "شاورما لحمة رول صاج", priceVal: 155, price: "155 ج.م", description: "شاورما لحمة بلدي مع بقدونس وبصل وطماطم وصوص طحينة في خبز صاج مقرمش.", image: "./beef-shawarma-wrap.jpg" },
  { id: 14, category: "شاورما وصاج", name: "فتة شاورما فراخ بالتومية", priceVal: 165, price: "165 ج.م", description: "أرز بسمتي أصفر مع شاورما فراخ وعيش لبناني مقرمش وصوص تومية كريمي.", image: "./chicken-shawarma-fattah.jpg" },
  { id: 15, category: "شاورما وصاج", name: "فتة شاورما لحمة بلدي", priceVal: 185, price: "185 ج.م", description: "أرز بسمتي مع شاورما لحمة وعيش محمص وصوص طحينة متبل.", image: "./beef-shawarma-fattah.jpg" },
  { id: 16, category: "شاورما وصاج", name: "فتة شاورما ميكس (لحم + دجاج)", priceVal: 195, price: "195 ج.م", description: "مزيج الشاورما اللحم والفراخ مع الأرز البسمتي والمكسرات وصوص التومية والطحينة.", image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=400&q=80", tag: "ميكس فاخر 🌟" },

  // --- طواجن وصواني بلدي ---
  { id: 17, category: "طواجن وصواني بلدي", name: "طاجن عكاوي بالبصل الأورما", priceVal: 320, price: "320 ج.م", description: "عكاوي بلدي مطهوة ببطء في طاجن فخار مع صوص البصل المكرمل وجوزة الطيب.", image: "./oxtail-tajine.jpg", tag: "طبق اليوم 👑" },
  { id: 18, category: "طواجن وصواني بلدي", name: "طاجن ملوخية خضراء بالطشة", priceVal: 90, price: "90 ج.م", description: "ملوخية طازجة مخروطة يومياً بطشة الثوم والكزبرة والسمن البلدي.", image: "./molokhia-pot.jpg" },
  { id: 19, category: "طواجن وصواني بلدي", name: "طاجن بامية باللحمة الضاني", priceVal: 230, price: "230 ج.م", description: "بامية بلدي صلصة حمراء مسبكة مع قطع لحم ضاني وفلفل حار بالفرن.", image: "./okra-lamb-tajine.jpg" },
  { id: 20, category: "طواجن وصواني بلدي", name: "طاجن ورق عنب بالكوارع", priceVal: 250, price: "250 ج.م", description: "أصابع ورق عنب دايبة مع قطع كوارع مخلية محمرة في الطاجن الفخاري.", image: "./grape-leaves-tajine.jpg" },
  { id: 21, category: "طواجن وصواني بلدي", name: "طاجن مكرونة فرن باللحمة المفرومة", priceVal: 110, price: "110 ج.م", description: "مكرونة قلم بصلصة الطماطم الغنية بالبهارات ولحم مفروم معصج محمر بالفرن.", image: "./pasta-tajine-minced-meat.jpg" },
  { id: 22, category: "طواجن وصواني بلدي", name: "طاجن موزة ضاني بالأرز البسمتي", priceVal: 340, price: "340 ج.م", description: "موزة ضاني كاملة دايبة ومتحمرة بالفرن تقدم فوق جبل أرز بسمتي بالمكسرات.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80", tag: "طاجن العزومات 🍖" },
  { id: 23, category: "طواجن وصواني بلدي", name: "طاجن لسان عصفور باللحمة", priceVal: 195, price: "195 ج.م", description: "لسان عصفور محمر مطهو في مرقة غنية مع قطع لحم بقري مكعبات.", image: "./orzo-meat-tajine.jpg" },
  { id: 24, category: "طواجن وصواني بلدي", name: "كفتة داوود باشا بالصلصة", priceVal: 175, price: "175 ج.م", description: "كرات لحم مفروم بالبقدونس في صلصة طماطم مسبكة بالفرن تقدم مع أرز.", image: "./dawood-basha.jpg" },
  { id: 25, category: "طواجن وصواني بلدي", name: "صينية بطاطس بالفراخ في الفرن", priceVal: 185, price: "185 ج.م", description: "شرائح بطاطس مع قطع دجاج متبلة بصلصة الطماطم والبصل في صينية فرن بلدي.", image: "./potato-chicken-tray.jpg" },
  { id: 26, category: "طواجن وصواني بلدي", name: "مشكل محاشي مشكل", priceVal: 135, price: "135 ج.م", description: "تشكيلة من محشي الكوسة، الباذنجان، والفلفل بخلطة الأرز المصرية بالخضار.", image: "./mixed-mahshi.jpg" },
  { id: 27, category: "طواجن وصواني بلدي", name: "كشري مصري مخصوص", priceVal: 60, price: "60 ج.م", description: "مكرونة وأرز وعدس وحمص وبصل مقرمش مع صلصة ودقة وشطة حارة.", image: "./egyptian-koshary.jpg" },

  // --- ساندوتشات وحواوشي ---
  { id: 28, category: "ساندوتشات وحواوشي", name: "حواوشي بلدي على الفحم", priceVal: 85, price: "85 ج.م", description: "رغيف حواوشي لحم بلدي متبل بالبصل والفلفل ومشوي على الفحم مقرمش.", image: "./hawawshi-baladi.jpg", tag: "قرمشة الفحم 🔥" },
  { id: 29, category: "ساندوتشات وحواوشي", name: "حواوشي مخصوص بميكس الجبن", priceVal: 105, price: "105 ج.م", description: "لحم بلدي متبل محشو بميكس موتزاريلا ورومي وشيدر سايح ع الفحم.", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80" },
  { id: 30, category: "ساندوتشات وحواوشي", name: "ساندوتش كبدة إسكندراني", priceVal: 65, price: "65 ج.م", description: "كبدة بلدي متبلة بالثوم والليمون والفلفل الحار في خبز فينو طازج مع طحينة.", image: "./alexandrian-liver-sandwich.jpg" },
  { id: 31, category: "ساندوتشات وحواوشي", name: "ساندوتش سجق شرقي إسكندراني", priceVal: 70, price: "70 ج.م", description: "سجق شرقي بصلصة الطماطم والفلفل الألوان والبصل في خبز فينو.", image: "./oriental-sausage-sandwich.jpg" },
  { id: 32, category: "ساندوتشات وحواوشي", name: "ساندوتش كفتة حاتي فينو", priceVal: 65, price: "65 ج.م", description: "أصابع كفتة حاتي مشوية في عيش فينو طازج مع طحينة وبقدونس.", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80" },

  // --- فطير ومخبوزات ---
  { id: 33, category: "فطير ومخبوزات", name: "فطير مشلتت بلدي بالسمن الفلاحي", priceVal: 145, price: "145 ج.م", description: "فطيرة مشلتتة مورقة ومخبوزة بالسمن البلدي الفلاحي تقدم مع عسل وجبنة قديمة.", image: "./feteer-meshaltet.jpg", tag: "سمن فلاحي 🍯" },
  { id: 34, category: "فطير ومخبوزات", name: "فطيرة شرقي سجق وميكس جبن", priceVal: 190, price: "190 ج.م", description: "فطيرة محشوة سجق شرقي، ميكس جبن، طماطم وفلفل وزيتون مخبوزة بالفرن.", image: "./feteer-sausage-cheese.jpg" },
  { id: 35, category: "فطير ومخبوزات", name: "فطيرة شرقي لحمة مفرومة وبسطرمة", priceVal: 210, price: "210 ج.م", description: "فطيرة شرقية بحشوة غنية من اللحم المفروم والبسطرمة البلدي والموتزاريلا.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
  { id: 36, category: "فطير ومخبوزات", name: "فطيرة حلوة كاسترد وسكر وحليب", priceVal: 110, price: "110 ج.م", description: "فطيرة مورقة محشوة كاسترد ومرشوشة بسكر بودرة وحليب ساخن ومكسرات.", image: "./sweet-feteer-custard.jpg" },
  { id: 37, category: "فطير ومخبوزات", name: "سلة عيش بلدي سخن (5 أرغفة)", priceVal: 15, price: "15 ج.م", description: "عيش بلدي مخبوز بالردة في الفرن الحجري طازج وساخن.", image: "./fresh-baladi-bread.jpg" },

  // --- شوربة ومقبلات وسلطات ---
  { id: 38, category: "شوربة ومقبلات", name: "شوربة كوارع مخلية بالليمون", priceVal: 115, price: "115 ج.م", description: "شوربة كوارع دسمة وغنية بالبهارات مع قطع كوارع مسلوقة مخلية وليمون.", image: "./trotters-soup.jpg", tag: "طاقة وعافية 🥣" },
  { id: 39, category: "شوربة ومقبلات", name: "شوربة لسان عصفور بلدي", priceVal: 45, price: "45 ج.م", description: "شوربة لسان عصفور محمر في مرقة دجاج غنية مع شرائح ليمون طازج.", image: "./orzo-soup.jpg" },
  { id: 40, category: "شوربة ومقبلات", name: "شوربة خضار مشكل باللحم", priceVal: 65, price: "65 ج.م", description: "كوسة وجزر وفاصوليا وبطاطس في مرقة لحم بلدي متبلة بالأعشاب.", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80" },
  { id: 41, category: "شوربة ومقبلات", name: "كبيبة شامي مقلية (4 قطع)", priceVal: 85, price: "85 ج.م", description: "برغل محشو باللحمة المفرومة المعصجة والمكسرات مقلية ومقرمشة.", image: "./kibbeh-fried.jpg" },
  { id: 42, category: "شوربة ومقبلات", name: "سمبوسك ميكس جبن ولحم (6 قطع)", priceVal: 70, price: "70 ج.م", description: "رقائق سمبوسك مقرمشة محشوة بجبنة كيري ولحم مفروم معصج.", image: "./sambousek-mix.jpg" },
  { id: 43, category: "شوربة ومقبلات", name: "طحينة بيضاء سمسم بلدي بيور", priceVal: 30, price: "30 ج.م", description: "طحينة سمسم متبلة بالخل والليمون والكمون وزيت الزيتون البكر.", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80", tag: "أساسي للمشويات 🥗" },
  { id: 44, category: "شوربة ومقبلات", name: "سلطة فتوش بدبس الرمان والعيش", priceVal: 45, price: "45 ج.م", description: "خضروات طازجة مع سماق ودبس رمان وعيش لبناني محمص مقرمش وزيت زيتون.", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80" },
  { id: 45, category: "شوربة ومقبلات", name: "سلطة تبولة خضراء بزيت الزيتون", priceVal: 45, price: "45 ج.م", description: "بقدونس مفروم طازج مع طماطم وبرغل ناعم وعصير ليمون وزيت زيتون بكر.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" },
  { id: 46, category: "شوربة ومقبلات", name: "حمص بيروتي بزيت الزيتون", priceVal: 50, price: "50 ج.م", description: "حمص ناعم بالطحينة والليمون وزيت الزيتون البكر ورشة كمون وبابريكا.", image: "./hummus-olive-oil.jpg" },
  { id: 47, category: "شوربة ومقبلات", name: "بابا غنوج مشوي على الفحم", priceVal: 45, price: "45 ج.م", description: "باذنجان مشوي على الفحم مهروس بالطحينة والثوم ودبس الرمان وحبات الرمان.", image: "./baba-ghanoush.jpg" },
  { id: 48, category: "شوربة ومقبلات", name: "سلطة كول سلو كريمي", priceVal: 35, price: "35 ج.م", description: "كرنب وجزر مبشور طازج مغطى بصوص مايونيز كريمي وعسل نحل طبيعي.", image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=400&q=80" },
  { id: 49, category: "شوربة ومقبلات", name: "تومية بيضاء وتومية حارة", priceVal: 30, price: "30 ج.م", description: "تومية شامية كريمية على أصولها تقدم مع تومية حارة متبلة بالشطة.", image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&w=400&q=80" },
  { id: 50, category: "شوربة ومقبلات", name: "باذنجان مخلل بالدقة والتوم", priceVal: 30, price: "30 ج.م", description: "باذنجان عروس مقلي ومحشو بالثوم والخل والليمون والفلفل الأحمر والأخضر.", image: "./oriental-pickles-salad.jpg" },
  { id: 51, category: "شوربة ومقبلات", name: "سلطات مشكلة ومخللات القصر", priceVal: 40, price: "40 ج.م", description: "طبق ميكس يضم طماطم متبلة، مخلل لفت وخيار بلدي، وسلطة بلدي خضراء.", image: "./oriental-pickles-salad.jpg" },
  { id: 52, category: "شوربة ومقبلات", name: "بطاطس محمرة مع صوص شيدر", priceVal: 55, price: "55 ج.م", description: "أصابع بطاطس مقلية مقرمشة مغطاة بصوص جبنة شيدر كريمي وساخن.", image: "./french-fries-cheddar.jpg" },

  // --- حلويات شرقية ---
  { id: 53, category: "حلويات شرقية", name: "أم علي بالقشطة والمكسرات", priceVal: 75, price: "75 ج.م", description: "رقائق الملفيه بالحليب الساخن والمكسرات المحمصة مع طبقة قشطة بلدي محمرة.", image: "./om-ali-dessert.jpg", tag: "قشطة بلدي 🍯" },
  { id: 54, category: "حلويات شرقية", name: "طاجن أم علي بالنوتيلا والبندق", priceVal: 90, price: "90 ج.م", description: "أم علي غنية بشوكولاتة نوتيلا السايحة مع بندق ومكسرات بالفرن.", image: "./nutella-om-ali.jpg" },
  { id: 55, category: "حلويات شرقية", name: "كنافة مانجو بالكريمة الغنية", priceVal: 85, price: "85 ج.م", description: "كنافة مقرمشة بطبقات كريمة الخفق وقطع مانجو طبيعية فريش.", image: "./kunafa-mango.jpg" },
  { id: 56, category: "حلويات شرقية", name: "كنافة نابلسية بالجبنة السايحة", priceVal: 95, price: "95 ج.م", description: "كنافة خشنة محشوة بجبنة عكاوي سايحة ومسقية بالشربات الدافئ والفستق.", image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=400&q=80", tag: "سايحة ومقرمشة 🧀" },
  { id: 57, category: "حلويات شرقية", name: "أرز بلبن بالفرن (معمر حلو)", priceVal: 50, price: "50 ج.م", description: "طاجن أرز بالحليب والقشطة والسمن البلدي محمر الوجه بالمكسرات.", image: "./baked-rice-pudding.jpg" },
  { id: 58, category: "حلويات شرقية", name: "مشكل حلويات شرقية فاخر", priceVal: 95, price: "95 ج.م", description: "طبق مشكل يضم بسبوسة بالسمن البلدي، بقلاوة بالفستق، وكنافة ملفوفة.", image: "./oriental-sweets-mix.jpg" },

  // --- مشروبات وعصائر فريش ---
  { id: 59, category: "مشروبات وعصائر فريش", name: "عصير مانجو فريش طبيعي", priceVal: 50, price: "50 ج.م", description: "عصير مانجو طبيعي 100% بدون أي إضافات صناعية مثلج ومنعش وغني بالقوام.", image: "./fresh-mango-juice.jpg", tag: "طبيعي 100% 🥭" },
  { id: 60, category: "مشروبات وعصائر فريش", name: "عصير برتقال فريش معصور", priceVal: 45, price: "45 ج.م", description: "عصير برتقال بلدي معصور طازج فور الطلب بدون سكر مضاف وغني بفيتامين C.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80", tag: "عصر فوري 🍊" },
  { id: 61, category: "مشروبات وعصائر فريش", name: "عصير فراولة بلدي طبيعي", priceVal: 45, price: "45 ج.م", description: "فراولة طازجة مثلجة ومخفوقة بقوام كثيف ومنعش.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80" },
  { id: 62, category: "مشروبات وعصائر فريش", name: "عصير ليمون بالنعناع فريش", priceVal: 40, price: "40 ج.م", description: "عصير ليمون طازج مثلج ومخفوق بأوراق النعناع الأخضر المنعش والثلج المجروش.", image: "./lemon-mint-juice.jpg" },
  { id: 63, category: "مشروبات وعصائر فريش", name: "عصير جوافة بالحليب والعسل", priceVal: 45, price: "45 ج.م", description: "جوافة منزوعة البذر مخفوقة بالحليب الطازج وعسل النحل الطبيعي.", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=400&q=80" },
  { id: 64, category: "مشروبات وعصائر فريش", name: "موهيتو ليمون ونعناع صودا", priceVal: 50, price: "50 ج.م", description: "ليمون ونعناع فريش مدقوق مع صودا وثلج ونكهة بلو كوراساو المنعشة.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80", tag: "انتعاش الصيف 🧊" },
  { id: 65, category: "مشروبات وعصائر فريش", name: "كوكتيل فواكه قصر المشويات", priceVal: 60, price: "60 ج.م", description: "طبقات من عصير المانجو والفراولة والجوافة مع قطع فواكه مشكلة ومكسرات.", image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80", tag: "توقيع القصر 👑" },
  { id: 66, category: "مشروبات وعصائر فريش", name: "كركديه أسواني مثلج مروي", priceVal: 30, price: "30 ج.م", description: "مشروب كركديه أسواني طبيعي مروي ومثلج غني بالانتعاش.", image: "./hibiscus-iced-tea.jpg" },
  { id: 67, category: "مشروبات وعصائر فريش", name: "عصير قصب سكر مثلج", priceVal: 25, price: "25 ج.م", description: "عصير قصب سكر طبيعي طازج يقدم بارداً مع ثلج مجروش.", image: "./sugarcane-juice.jpg" }
];

const categoryIcons = {
  "الكل": "🌟",
  "مشويات على الفحم": "🥩",
  "شاورما وصاج": "🌯",
  "طواجن وصواني بلدي": "🍲",
  "ساندوتشات وحواوشي": "🥪",
  "فطير ومخبوزات": "🥧",
  "شوربة ومقبلات": "🥗",
  "حلويات شرقية": "🍯",
  "مشروبات وعصائر فريش": "🍹"
};

const categories = Object.keys(categoryIcons);
let activeCategory = "الكل";
let cart = {}; // { dishId: quantity }

// Elements
const categoriesWrapper = document.getElementById("categoriesWrapper");
const drawerCategories = document.getElementById("drawerCategories");
const menuGridFeed = document.getElementById("menuGridFeed");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// Mobile Drawer Elements
const sidebarDrawer = document.getElementById("sidebarDrawer");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const openDrawerBtn = document.getElementById("openDrawerBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");

// Theme Toggle
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

// Floating Bar & Modal
const floatingBar = document.getElementById("floatingBar");
const floatingCount = document.getElementById("floatingCount");
const floatingTotalPrice = document.getElementById("floatingTotalPrice");
const openCartBtn = document.getElementById("openCartBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeCartBtn = document.getElementById("closeCartBtn");
const sheetItemsContainer = document.getElementById("sheetItemsContainer");
const summaryCount = document.getElementById("summaryCount");
const summaryTotal = document.getElementById("summaryTotal");
const sendWhatsappBtn = document.getElementById("sendWhatsappBtn");

// Customer Form Inputs
const custName = document.getElementById("custName");
const custPhone = document.getElementById("custPhone");
const custAddress = document.getElementById("custAddress");
const custNotes = document.getElementById("custNotes");

// Detail Modal
const dishModal = document.getElementById("dishModal");
const closeDishModalBtn = document.getElementById("closeDishModalBtn");
const dishModalImg = document.getElementById("dishModalImg");
const dishModalTitle = document.getElementById("dishModalTitle");
const dishModalPrice = document.getElementById("dishModalPrice");
const dishModalDesc = document.getElementById("dishModalDesc");
const dishModalTag = document.getElementById("dishModalTag");
const dishModalAddBtn = document.getElementById("dishModalAddBtn");
const dishModalBtnPrice = document.getElementById("dishModalBtnPrice");
let currentSelectedDishId = null;

// ==================== DRAWER MANAGEMENT ====================
function toggleDrawer(isOpen) {
  if (isOpen) {
    sidebarDrawer.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    sidebarDrawer.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

if (openDrawerBtn) openDrawerBtn.addEventListener("click", () => toggleDrawer(true));
if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", () => toggleDrawer(false));
if (sidebarOverlay) sidebarOverlay.addEventListener("click", () => toggleDrawer(false));

// ==================== THEME MANAGEMENT ====================
function initTheme() {
  const savedTheme = localStorage.getItem("menu_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("menu_theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
});

// Load Saved Customer Info
function loadCustomerInfo() {
  const savedInfo = JSON.parse(localStorage.getItem("customer_order_info") || "{}");
  if (savedInfo.name) custName.value = savedInfo.name;
  if (savedInfo.phone) custPhone.value = savedInfo.phone;
  if (savedInfo.address) custAddress.value = savedInfo.address;
}

// ==================== CATEGORIES & FEED ====================
function renderCategories() {
  categoriesWrapper.innerHTML = categories
    .map(
      (cat) => `
      <button class="cat-story-btn ${cat === activeCategory ? "active" : ""}" onclick="selectCategory('${cat}')">
        <span>${categoryIcons[cat]}</span>
        <span>${cat}</span>
      </button>
    `
    )
    .join("");

  if (drawerCategories) {
    drawerCategories.innerHTML = categories
      .map(
        (cat) => `
        <button class="drawer-cat-btn ${cat === activeCategory ? "active" : ""}" onclick="selectCategoryFromDrawer('${cat}')">
          <span>${categoryIcons[cat]}</span>
          <span>${cat}</span>
        </button>
      `
      )
      .join("");
  }
}

function selectCategory(cat) {
  activeCategory = cat;
  renderCategories();
  renderMenu();
}

window.selectCategoryFromDrawer = function (cat) {
  selectCategory(cat);
  toggleDrawer(false);
};

function addToCart(id, e) {
  if (e) e.stopPropagation();
  cart[id] = (cart[id] || 0) + 1;
  updateCartState();
}

function decreaseFromCart(id, e) {
  if (e) e.stopPropagation();
  if (cart[id]) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    updateCartState();
  }
}

function updateCartState() {
  let count = 0;
  let total = 0;

  Object.keys(cart).forEach((id) => {
    const dish = menuData.find((d) => d.id === parseInt(id));
    if (dish) {
      count += cart[id];
      total += cart[id] * dish.priceVal;
    }
  });

  floatingCount.textContent = count;
  floatingTotalPrice.textContent = `${total} ج.م`;
  summaryCount.textContent = count;
  summaryTotal.textContent = `${total} ج.م`;

  if (count > 0) {
    floatingBar.classList.add("show");
  } else {
    floatingBar.classList.remove("show");
    checkoutModal.classList.remove("active");
  }

  renderMenu();
  renderSheetItems();
}

function renderSheetItems() {
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    sheetItemsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">قائمتك فارغة</p>`;
    return;
  }

  sheetItemsContainer.innerHTML = ids
    .map((id) => {
      const dish = menuData.find((d) => d.id === parseInt(id));
      const qty = cart[id];
      return `
      <div class="sheet-dish-row">
        <div>
          <div class="sheet-dish-name">${dish.name}</div>
          <div class="sheet-dish-subprice">${dish.priceVal * qty} ج.م (${dish.priceVal} × ${qty})</div>
        </div>
        <div class="inline-qty-ctrl">
          <button class="inline-btn" onclick="decreaseFromCart(${dish.id})">-</button>
          <span class="inline-qty-num">${qty}</span>
          <button class="inline-btn" onclick="addToCart(${dish.id})">+</button>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderMenu() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = menuData.filter((item) => {
    const matchesCat = activeCategory === "الكل" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    menuGridFeed.innerHTML = `
      <div style="text-align:center; padding: 60px 0; color: var(--text-muted);">
        <div style="font-size:2.5rem; margin-bottom:10px;">🔍</div>
        <p style="font-weight:900; font-size:1.1rem; color:var(--text-main);">مفيش وجبة مطابقة للبحث</p>
        <small style="color:var(--text-subtle);">جرب تبحث بكلمة تانية أو اختر قسماً من الأعلى</small>
      </div>
    `;
    return;
  }

  const grouped = {};
  filtered.forEach((dish) => {
    if (!grouped[dish.category]) grouped[dish.category] = [];
    grouped[dish.category].push(dish);
  });

  menuGridFeed.innerHTML = Object.keys(grouped)
    .map(
      (cat) => `
      <section class="feed-section">
        <h2 class="feed-title">${cat}</h2>
        <div class="feed-cards-container">
          ${grouped[cat]
            .map((dish) => {
              const qtyInCart = cart[dish.id] || 0;
              return `
            <div class="menu-card" onclick="openDishDetailModal(${dish.id})">
              <div class="card-img-wrap">
                <img src="${dish.image}" alt="${dish.name}" loading="lazy" onerror="this.style.display='none'" />
                ${dish.tag ? `<span class="card-tag">${dish.tag}</span>` : ""}
              </div>
              <div class="card-content">
                <h3 class="card-title">${dish.name}</h3>
                <p class="card-desc">${dish.description}</p>
                <div class="card-bottom-row">
                  <span class="card-price">${dish.price}</span>
                  <div class="card-actions-zone">
                    ${
                      qtyInCart > 0
                        ? `
                      <div class="inline-qty-ctrl" onclick="event.stopPropagation()">
                        <button class="inline-btn" onclick="decreaseFromCart(${dish.id}, event)">-</button>
                        <span class="inline-qty-num">${qtyInCart}</span>
                        <button class="inline-btn" onclick="addToCart(${dish.id}, event)">+</button>
                      </div>
                    `
                        : `
                      <button class="add-item-btn" onclick="addToCart(${dish.id}, event)" title="إضافة للطلب">+</button>
                    `
                    }
                  </div>
                </div>
              </div>
            </div>
          `;
            })
            .join("")}
        </div>
      </section>
    `
    )
    .join("");
}

function openDishDetailModal(id) {
  const dish = menuData.find((d) => d.id === id);
  if (!dish) return;
  currentSelectedDishId = id;

  dishModalImg.src = dish.image;
  dishModalTitle.textContent = dish.name;
  dishModalPrice.textContent = dish.price;
  dishModalDesc.textContent = dish.description;
  dishModalBtnPrice.textContent = dish.price;

  if (dish.tag) {
    dishModalTag.textContent = dish.tag;
    dishModalTag.style.display = "inline-block";
  } else {
    dishModalTag.style.display = "none";
  }

  dishModal.classList.add("active");
}

dishModalAddBtn.addEventListener("click", () => {
  if (currentSelectedDishId) {
    addToCart(currentSelectedDishId);
    dishModal.classList.remove("active");
  }
});

closeDishModalBtn.addEventListener("click", () => dishModal.classList.remove("active"));
dishModal.addEventListener("click", (e) => {
  if (e.target === dishModal) dishModal.classList.remove("active");
});

openCartBtn.addEventListener("click", () => checkoutModal.classList.add("active"));
closeCartBtn.addEventListener("click", () => checkoutModal.classList.remove("active"));
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) checkoutModal.classList.remove("active");
});

sendWhatsappBtn.addEventListener("click", () => {
  const name = custName.value.trim();
  const phone = custPhone.value.trim();
  const address = custAddress.value.trim();
  const notes = custNotes.value.trim();

  if (!name) {
    alert("من فضلك اكتب الاسم بالكامل");
    custName.focus();
    return;
  }
  if (!phone) {
    alert("من فضلك اكتب رقم الموبايل للتواصل");
    custPhone.focus();
    return;
  }
  if (!address) {
    alert("من فضلك اكتب العنوان بالتفصيل للتوصيل");
    custAddress.focus();
    return;
  }

  // Save info locally for next time
  localStorage.setItem("customer_order_info", JSON.stringify({ name, phone, address }));

  let orderMsg = `*🔥 طلب دليفري جديد من منيو قصر المشويات:*\n`;
  orderMsg += `═══════════════════\n`;
  orderMsg += `👤 *الاسم:* ${name}\n`;
  orderMsg += `📞 *الموبايل:* ${phone}\n`;
  orderMsg += `📍 *العنوان:* ${address}\n`;
  if (notes) {
    orderMsg += `📝 *ملاحظات:* ${notes}\n`;
  }
  orderMsg += `═══════════════════\n`;
  orderMsg += `*📋 تفاصيل الأصناف المطلوبة:*\n`;

  let total = 0;
  let count = 0;

  Object.keys(cart).forEach((id) => {
    const dish = menuData.find((d) => d.id === parseInt(id));
    const qty = cart[id];
    orderMsg += `▪️ *${dish.name}*\n   الكمية: (${qty}) × ${dish.priceVal} = *${dish.priceVal * qty} ج.م*\n`;
    total += dish.priceVal * qty;
    count += qty;
  });

  orderMsg += `═══════════════════\n`;
  orderMsg += `📦 *إجمالي عدد الأصناف:* ${count}\n`;
  orderMsg += `💰 *الحساب الإجمالي:* *${total} ج.م*\n`;
  orderMsg += `═══════════════════\n`;
  orderMsg += `_برجاء تأكيد استلام الطلب وتحديد وقت التوصيل المتوقع._`;

  window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(orderMsg)}`, "_blank");
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim().length > 0) {
    clearSearchBtn.style.display = "block";
  } else {
    clearSearchBtn.style.display = "none";
  }
  renderMenu();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  renderMenu();
});

// Init
initTheme();
loadCustomerInfo();
renderCategories();
renderMenu();