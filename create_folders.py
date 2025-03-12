import os
import tkinter as tk
from tkinter import ttk, filedialog, messagebox
from PIL import Image, ImageTk

# Списки персонажів
folder_lists = {
    '1': {
        'name': 'ZZZ',
        'folders': [
            "Bell", "Grace", "Jane", "Koleda", "Corin", "Lucy", "Miyabi", "Nikole", "Nekomata", "Piper", "Alexabdrina", "Soukaku", "Soldier11", "Qingyi", "Zhu Yuan", "Ellen Joe", "Anby", "King Caesar", "Burnice", "Yanagi", "Evelyn", "Astra"
        ]
    },
    '2': {
        'name': 'Genshin',
        'folders': [
            "Arlecchino", "Ayaka", "Barbara", "Beidou", "Ganyu", "Jean", "Diona", "Diori", "Dehya", "Yoimiya", "Yelan", "Candace", "Kachina", "Kirara", "Klee", "Clorinde", "Kokomi", "Collei", "Columbina", "Kuki Shinobu",
            "Keqing", "Layla", "Lisa", "Lynett", "Lumin", "Mavuika", "Mona", "Mualani", "Navia", "Nahida", "Nilou", "Ningguang", "Noelle", "Raiden", "Rosaria", "Sara", "Sucrose", "Sayu", "Sigewinne", "Signora",
            "Xinyan", "Citlali", "Skirk", "Xiangling", "Xilanyun", "Chiori", "Faruzan", "Fichl", "Furina", "HuTao", "Qiqi", "Chasca", "Charlotte", "Shevreuse", "Shenhe", "Xilonen", "Amber", "Emilie", "Eula", "YunJin",
            "Yanfei", "Yaoyao", "Yae Mika", "Paimon", "Fatui", "Yumemizuki", "Varesa"
        ]
    },
    '3': {
        'name': 'Honkai star rail',
        'folders': [
            "Asta", "Asheron", "Bailu",  "BlackSwan", "Bronya", "Gerta", "Guinaifen",
            "RuanMei", "Seele", "Kafka", "Clara", "March7", "Natasha", "Pela", "Robin",
            "Lynx", "Firefly", "Serval", "Sushang", "SilverWolf", "Sparkle", "Stella", "Xueyi", "Topaz",
            "Tingyun", "FuXuan", "FeiXiao", "Himeko", "Hook", "HuoHuo", "Jingliu", "Qingque", "Yukong", "Yunli",
            "Hanya", "Jade", "Lingsha", "Cocolia", "Rappa", "Teresa", "Herta", "Fugue", "Aglaea", "Tribbie"
        ]
    },
    '4': {
        'name': 'SAO',
        'folders':[
            "Asuna", "Leafa", "Alicia Rue", "Silica", "Lisbet", "Rosalia", "Sachi", "Sakuya", "Yui", "Sinon", "Yuuki", "Yuna", "Siune", "Alice", "Azurika", "Quinella", "Ronie Arabel", "Sortiliena Serlut", "Tiese Shtolienen"
        ]
    },
    '6': {
        'name': 'Sousou no Friren',
        'folders': [
            "Friren", "Fern", "Ubel", "Aura", "Flamme", "Lavina", "Kanne", "Laufen", "Zerie", "Lini", "Ere", "Zeneze", "Edel", "Lenge"
        
        ]
    },
    '5': {
        'name': 'Anime',
        'folders':[
            "02", "2.5-jigen no Ririsa", "100-nin no Kanojo",
            "A Certain Scientific Rhineland","Akame's killer","Avatar","Akuyaku Reijou Level 99. Watashi wa Ura-Boss desu ga Maou dewa Arimasen","Amagi Brilliant Park", "An Archdemon's Dilemma. How to Love Your Elf Bride", "Amagami-san Chi no Enmusubi","Arifureta",
            "Bocchi the Rock!", "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san", "Black clover", "Bleach","Blue Exorcist", "Boku no Kokoro no Yabai Yatsu","Bokutachi wa Benkyou ga Dekinai","Brawl Star",
            "CC","Charlotte","Chef fighter Soma", "Combatants Will Be Dispatched", "Crush Crush","Cybepunk", "Chiyu MAhou no Machigatta Tsukaikata Senjou wo Kakeru Kafuku Youin", "Chainsaw Man",
            "Dandadan","Dangaronpa", "Dark Gathering","Date a live", "DDLC","Doctor Stoun", "Dungeon ni Deai o Motomeru no wa Machigatte Iru Darouka","Dxd","Dagashi Kashi",
            "Eromanga-sensei", "Evangelion",
            "Fullmetal Alchemist","Future Diary", "Fuufu Ijou, Koibito Miman","Failure Frame", "Fairy Tail","Fate",
            "Gate of Stein","Gate. Jieitai Kanochi nite, Kaku Tatakaeri", "Gawr gura","Goblin Slayer","Gurren Lagann","Go-Toubun no Hanayome",
            "Hajimete no Gal", "Hataraku Maou-sama!","Hatsune Miku", "Hikikomari Kyuuketsuki no Monmon","Himouto! Umaru-chan", "Hiyoku no Hane","Horumiya", "Houshou Marine","Hundred", "Hyouka. You can't escape","Higurashi no Naku Kori ni",
            "Iandruanya Elaine", "Isekai wa Smartphone to Tomo ni","Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu", "Isekai de Cheat Skill wo Te ni Shita Ore wa Genjitsu Sekai wo mo Musou Suru Level Up wa Jinsei woKaeta",
            "Jujutsu Kaisen", "Jigokuraku",
            "Kaguya-sama wa Kokurasetai Tensai-tachi no Ren`ai Zunousen", "Kaiju 8","Kakkou no Iinazuke", "Karakai Jouzu no Takagi-san","Kawaii dake ja Nai Shikimori-san", "Keikenzumi na Kimi to, Keiken Zero na Ore ga, Otsukiai suru Hanashi","Kill and kill", "Kobayashi-san Chi no Maid Dragon","Komi-san", "Konosuva","KRD", "Kumo Desu ga, Nani ka", "Kanojo mo Kanojo", "Kage no Jitsuryokusha hi Haritakute", "Kafuku Jutsushi no Yarinaoshi", "Kanojo Okarishimasu",
            "LMRR", "Lycoris Recoil",
            "Mahou Shoujo ni Akogarete", "Mahouka Koukou no Rettousei","Make Heroine ga Oosugiru!", "Mamahaha no Tsurego ga Motokano datta","Masamune's Revenge", "MHA","Monolog farmachevta", "Mieruko-chan","Ml Adventure", "Musaigen no Phantom World","Mushoku Tensei Isekai Ittara Honki Dasu", "Majo no Tabitabi","Masle", "Maou Gakuin no Futekigousha","Mamahaha no Tsuregi ga Motokano datta", 
            "Nagatoru","Naruto", "Nisekoi","No game, no life", "Non Non Biyori","Nozomanu Fushi no Boukensha","Nageki no Bourei wa Intai shitai", "Naze Boku no Sekai wo Daremo Oboteinai no ka?",
            "Oniichan wa Oshimai!", "Ookami to Koushinryou","Ore dake Haireru Kakushi Dungeon", "Ore no Imouto ga Konna ni Kawaii wake ga nai","Overflow", "Overlord","Owari no Seraph", "Oshi no ko", "One Room Hitari Futsuu Tenshi-tsuki"," Otonai no Tenshi-sama ni Itsunimanika Dame Nigen ni Sareteita Ken", "Otome Game Sekai wa Mob ni Kibishii desu",
            "Pokemon", "Princess Connect! Re.Dive",
            "Re.Zero", "Roku de Nashi Majutsu Koushi to Akashic Records",
            "Sekai Saikou no Ansatsusha Isekai Kizoku ni Tensei suru", "Saikin Yatotta Maid ga Ayashii","Saki-chan", "SAO","Seirei Gensouki", "Senko","Solo Leveling", "Shikanoko Nokonoko Koshitantan","Sono Bisque Doll wa Koi wo Suru", "Sousou no Frieren","Special squad for elimination in another world", "SSSS.Gridman","Strike of blood", "Summertime Render","Spy x Family","Saint Cecilia and Pastor Lawrence",
            "Tate no Yuusha no Nariagari", "Tensei Kizoku, Kantei Skill de Nariagaru","Tensei shitara Dainana Ouji Datta node, Kimama ni Majutsu wo Kiwamemasu", "Tensei Shitara Slime Datta Ken","The detective is already dead", "The Dreaming Boy Is a Realist","The seven deadly sins", "The Testament of Sister New Devil","To love ru Girls", "Tonikaku Kawaii","Toradora", "Tsue to Tsurugi no Wistoria","Tsuki ga Michibiku Isekai Douchuu",
            "Urusei Yatsura",
            "Yozakure-san Chi no Dasisukusen","Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e", "Yahari Ore no Seishun Love Comedy wa Machigatteiru","Yuusha Party wo Tsuihou sareta Beast Tamer, Saikyoushu no Nekomimi Shoujo to Deau",
            "Zero no Tsukaima",
            
        
        ]
    },
    '7':{
        'name': 'Date a Live',
        'folders':[
            "Toga", "Katori", "Origami", "Mio", "Kurumi", "Yoshuda", "Sister Yamai", "Miku", "Natsumi", "Nia", "Mukuro", "Ellen", "Mayuri", "Mana", "Nibelcole", "Shiro no Joo", "Arusu Maria", "Sonogami Rio", "Perfume"
        ]
    },
    '8':{
        'name': 'Бескінечне літо',
        'folders':[
            "Аліса", "Лена", "Славя","Міку","Ульяна", "Віола","Ольга Дмитрівна","Діана","Саманта","Женя","Юля", "Сова"
        ]
    },
    '9':{
        'name': 'Blue Arhive',
        'folders': [
            "Airi", "Akane", "Akari", "Ako", "Arisu", "Aru", "Asuna", "Atsuko", "Ayane", "Azusa",
            "Cherino", "Chiaki", "Chihiro", "Chinatsu", "Chise",
            "Eimi",
            "Fubuki", "Fuuka",
            "Hanae", "Hanako","Hare", "Haruka", "Haruna", "Hasumi", "Hatsune Miku", "Hibiki", "Hifumi", "Himari", "Hina", "HInata", "Hiyori", "Hoshino",
            "Ibuki", "Ichika", "Iori", "Iroha", "Izumi", "Izuna",
            "Junko", "Juri",
            "Kaede", "Kaho", "Kanna", "Karin", "Kasumi", "Kayoko", "Kazusa", "Kikyou", "Kirara", "Kirino", "Kisaki", "Koharu", "Kokona", "Kotama", "Kotori", "Koyki",
            "Maki", "Makato", "Mari", "Marina","Mashiro", "Megu", "Meru", "Michiru", "Midori", "Mika", "Mimori", "Mina", "Mine", "Minori", "Misaka Mikoto", "Misaki", "Miyako", "Miyu", "Moe", "Momiji", "Momoi", "Mutsuki",
            "Nagisa", "Natsu", "Neru", "Noa", "Nodoka", "Nonomi",
            "Pina",
            "Reijo", "Reisa", "Renge", "Rio", "Rumi",
            "Saki", "Sakurako", "Saori", "Saten Ruiko", "Satsuki", "Saya", "Seia", "Sena", "Serika", "Serina", "Shigure", "Shimiko", "Shiroko", "Shiriko Tero", "Shizuko", "Shokuhou", "Shun", "Shun Kid", "Sumire", "Suzumi",
            "Toki", "Tomoe", "Tsubaki", "Tsukuyo", "Tsurugi",
            "Ui", "Umika", "Utaha",
            "Wakamo",
            "Yoshimi", "Ykari", "Yuuka", "Yuzu"
        ]
    }
}

# Збираємо всіх персонажів
all_characters = []
for category in folder_lists.values():
    all_characters.extend(category['folders'])
all_characters.sort()

# Налаштування зображень
IMAGE_FOLDER = "character_images"
DEFAULT_IMAGE_PATH = "default_image.png"
character_images = {}
default_photo = None

def load_images():
    """Завантаження та підготовка зображень"""
    global default_photo
    try:
        # Дефолтне зображення
        default_img = Image.open(DEFAULT_IMAGE_PATH)
        default_img = default_img.resize((300, 500), Image.Resampling.LANCZOS)
        default_photo = ImageTk.PhotoImage(default_img)

        # Завантаження зображень персонажів
        for char in all_characters:
            filename = f"{char.replace(' ', '_').lower()}.png"
            img_path = os.path.join(IMAGE_FOLDER, filename)
            
            if os.path.exists(img_path):
                img = Image.open(img_path)
                img = img.resize((300, 500), Image.Resampling.LANCZOS)
                character_images[char] = ImageTk.PhotoImage(img)
                
    except Exception as e:
        messagebox.showerror("Помилка", f"Проблема з зображеннями: {str(e)}")

load_images()

def update_suggestions(event):
    """Оновлення списку підказок"""
    typed = entry.get().lower()
    suggestions = [name for name in all_characters if name.lower().startswith(typed)]
    combo_box['values'] = suggestions or ["Немає збігів"]
    combo_box.current(0)
    update_image()

def update_image(event=None):
    """Оновлення зображення персонажа"""
    selected = combo_box.get()
    if selected in character_images:
        image_label.config(image=character_images[selected])
    else:
        image_label.config(image=default_photo)

def choose_directory():
    """Вибір директорії"""
    path = filedialog.askdirectory()
    if path:
        path_label.config(text=path)

def create_folder():
    """Створення однієї папки"""
    path = path_label.cget("text")
    if not path:
        messagebox.showwarning("Увага", "Спочатку виберіть папку!")
        return
    
    character = combo_box.get()
    if character not in all_characters:
        messagebox.showerror("Помилка", "Невірний персонаж")
        return
    
    try:
        os.makedirs(os.path.join(path, character), exist_ok=True)
        messagebox.showinfo("Успіх", f"Папка '{character}' створена!")
    except Exception as e:
        messagebox.showerror("Помилка", f"Не вдалося створити: {e}")

def create_all_folders():
    """Створення всіх папок категорії"""
    path = path_label.cget("text")
    if not path:
        messagebox.showwarning("Увага", "Спочатку виберіть папку!")
        return
    
    category = category_box.get()
    category_data = next((c for c in folder_lists.values() if c['name'] == category), None)
    
    if not category_data:
        messagebox.showerror("Помилка", "Категорія не знайдена")
        return
    
    created = 0
    for char in category_data['folders']:
        try:
            os.makedirs(os.path.join(path, char), exist_ok=True)
            created += 1
        except:
            continue
    
    messagebox.showinfo("Успіх", f"Створено {created}/{len(category_data['folders'])} папок")

# Головне вікно
root = tk.Tk()
root.title("Менеджер папок для ігор")
root.geometry("1000x600")
root.configure(bg="#f0f0f0")

# Основний контейнер
main_frame = tk.Frame(root, bg="#f0f0f0")
main_frame.pack(fill="both", expand=True, padx=20, pady=20)

# Ліва частина - керування
left_frame = tk.Frame(main_frame, bg="#f0f0f0", width=400)
left_frame.pack(side="left", fill="y")

# Права частина - зображення
right_frame = tk.Frame(main_frame, bg="white", relief="sunken", bd=2)
right_frame.pack(side="right", fill="both", expand=True)

# Елементи керування
tk.Label(left_frame, text="📁 Батьківська папка:", bg="#f0f0f0").pack(anchor="w")
path_label = tk.Label(left_frame, text="", bg="white", relief="sunken", width=40)
path_label.pack(fill="x", pady=5)
tk.Button(left_frame, text="🔍 Вибрати папку", command=choose_directory).pack(pady=5)

ttk.Separator(left_frame, orient="horizontal").pack(fill="x", pady=10)

tk.Label(left_frame, text="🔍 Пошук персонажа:", bg="#f0f0f0").pack(anchor="w")
entry = tk.Entry(left_frame, width=30)
entry.pack(fill="x", pady=5)
entry.bind("<KeyRelease>", update_suggestions)

combo_box = ttk.Combobox(left_frame, values=all_characters, width=30)
combo_box.pack(fill="x", pady=5)
combo_box.bind("<<ComboboxSelected>>", update_image)

tk.Button(left_frame, text="📂 Створити папку", command=create_folder).pack(pady=10)

ttk.Separator(left_frame, orient="horizontal").pack(fill="x", pady=10)

tk.Label(left_frame, text="📚 Категорії:", bg="#f0f0f0").pack(anchor="w")
category_box = ttk.Combobox(left_frame, values=[cat['name'] for cat in folder_lists.values()], width=30)
category_box.pack(fill="x", pady=5)
tk.Button(left_frame, text="📁 Створити всі", command=create_all_folders).pack(pady=10)

# Відображення зображення
image_label = tk.Label(right_frame, bg="white")
image_label.pack(padx=20, pady=20, expand=True)
update_image()

root.mainloop()