# Watchgen Backend


## Kurulum

## Geliştirme Ortamı

## Sunucu Ortamına Hazırlama

## Model
Watchgen en başında blog siteleri gibi tek bir yükleyicinin olduğu düşünülen bir sistemdi, bu sistem küçük ölçekte gerçekten başarılı fakat ölçeği büyüttüğünüz vakit bütün yükün tek bir kişi tarafından üstlendiği bir çileye dönüşüyor.

O sebeple sistemi biraz genişletmemiz gerekicek, değiştirilecek sistem ölçeklendirilebilir olmalı ve yönetimi kolay olmalı.

Sistemi biraz YouTube, Animecix ve TurkAnime modeline bakarak geliştirebilirsiniz. Bu siteler 3 katmandan oluşur diyebiliriz; yönetici, yayıncı ve izleyici.

Yönetici: Yayıncı tarafından yüklenen videoları kontrol eder ve onların izleyici ve platform için sakıncalı olup olmadığını kontrol eder. Aynı zamanda izleyici tarafından yapılan yorumları kontrol ederek yorumun yayıncıya ve videoya bir hakaret, saldırı, cinsellik veya herhangi bir kural ihlalinin olup olmadığını kontrol eder.

Yayıncı: Platformda animelere video yükleyen kişidir.

İzleyici: Platformda animeleri izleyen ve yorum yapan kişidir.

Bu model sayesinde video yükleme işini Yönetici katmanından ayırıp Yayıncı katmanına atıyoruz fakat sistem denetimi hala Yöneticinin elinde.

TODO: Bu sistem denetimlerini otomasyona bindirebilirsin, örnek olarak her yorumu kontrol etmektense sadece rapor edilen yorumları kontrol edebilir, rapor edilen yorumlar ilk defa rapor edilmişse Llama3.2-Text (ince ayarlanmış) gibi modellere kontrol ettirilebilir. Videolar içinse aklıma bir şey gelmedi.

TODO: İleride yönetim ekibini geliştirmek amacıyla Yönetici gibi fakat yöneticiden yine aşşağıda bir katman olan Moderatör katmanını sisteme ekleyebilirsiniz. Sistemde herhangi bir yetki sızıntısı yaşanmadan denetimi elinizde tutabilirsiniz.

Sisteme Animeleri kim ekleyecek diye sorar gibi olduğunuzu görebiliyorum merak etmeyin animeleri sisteme herhangi bir katman eklemiyor animeler sisteme sistem tarafından ekleniyor (nasıl yani?). AniDB, MyAnimeList gibi siteler boşuna mı yapıldı koçum tabikide oradan emcükliyceksin ki Animecix'de öyle yapıyor zaten. animeleri kendileri eklemiyorlar doğrudan bir api üzerinden çekiyorlar (bunu kanıtlamak için animecix bölüm eklenmemiş animelere bakabilirsiniz). Türkanime'den ne haber dersen onlar amele kendileri ekliyorlar animeyi (sanırım).

TODO: MyAnimeList, AniDB gibi veritabanlarından veri çekmeyi öğren veya hali hazırda animelere sahip platformlardan (Animecix, Turkanime, YeniWatch) animeleri çekmeyi öğren