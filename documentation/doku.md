Alexander Köhler, Benedict Kruse, Nico Gensheimer, Luca Gauß, Dominik Klar
# Corona Flugverkehr
Dokumentation des Projektes 'Corona Flugverkehr' zum Thema ‘Social Distancing’ das im Rahmen
des Kurses 'Grundlagen der Datenvisualisierung' bei Herrn Prof. Dr. Till Nagel im 
Sommersemester 2020 an der Hochschule Mannheim stattgefunden hat.

Die Corona Pandemie hat durch die Corona-Verordnung zum Social Distancing und weiteren Einschränkungen geführt.
Im Projekt *Corona Flugverkehr* wird untersucht, welche Auswirkungen die Corona-Einschränkungen auf den weltweiten
Flugverkehr haben und wie diese im Verhältnis der positiv auf Corona getestet Personen stehen.
Die Daten des Flugverkehrs waren im Rahmen der Forschung frei zugänglich; die Zahlen der positiv auf Corona
getesteten Personen werden vom Offenen Datenportat der EU bereitgestellt. Es konnte festgestellt
werden, dass die Zahlen der positiv getesteten Personen im Zusammenhang mit dem Einbruch des globalen Flugverkehrs stehen.

# Einführung / Konzept
## Einführung
Dieses Projekt ist im Rahmen der Vorlesung 'Grundlagen der Datenvisualisierung' entstanden. Die Vorgabe war Daten 
die im Kontext von Social Distancing stehen auszuwählen, aufzubereiten, sie zu analysieren und schließlich mit einer 
interaktiven Visualisierung sichtbar zu machen.
Nach einer gemeinsamen Recherche, sind wir auf den Flugverkehr gekommen, der durch die Reisebeschränkungen stark
betroffen ist. Deshalb haben wir uns den Verlauf des Flugverkehrs genauer angesehen.

## Konzept
Zu Beginn planten wir ein interaktives Dashboard, das wir auf einer Website bereitstellen. Nach einer Recherche über
mögliche Visualisierungen entschieden wir uns für eine radiale Heatmap, die den Flugverkehr im Vergleich zum Vorjahr
darstellen soll. Und zwei Liniendiagramme, die den Flugverkehr und die Corona Fälle im Detail über den zeitlichen Verlauf
darstellen sollen. \
Diese Visualisierung sollte dabei folgende Frage zu beantworten:

######*Wie haben sich die Einschränkungen des SARS-CoV-2-Virus auf den weltweiten Flugverkehr ausgewirkt?*

Für die Umsetzung des Dashboards entschieden wir uns für *D3*, eine JavaScript Library zum erstellen von Visualisierungen. Darüber 
Hinaus entschieden wir uns für das Front-End Framework *Vue*.

# Daten / Auswertung / Prozess

## Daten
Unsere Datenquellen waren die Flugdaten des OpenSky Networks und die Coronadaten des Offenen Datenportals der EU. \
Das OpenSky Network ist ein Unternehmen in der Schweiz, die Flugdaten aufzeichnen. Die Flugdaten werden durch ca. 1000 Sensoren aufgezeichnet, die weltweit verstreut sind. Die meisten dieser 1000 Sensoren befinden sich in Europa und den USA.
Sie stellten aufgrund des Hohen Interesses — ausgelöst durch die Pandemie — einen bereinigten Datensatz öffentlich zur Verfügung. Dieser Datensatz enthielt allerdings nicht den Start und das Ziel der Flugzeuge.
Deshalb kontaktierten wir sie und baten um den vollständigen Datensatz, der uns durch den Rahmen eines Hochschulprojektes bereitgestellt wurde. \
Das Offene Datenportal der EU stellt die weiltweiten Fälle der Corona Infektionen bereit. 


## Auswertung
Die Flugdaten des OpenSky Networks fasst über 20 Billionen Datensätze, durch die wir uns erstmal durcharbeiten mussten. Schnell konnte man sehen, wie stark die 
Flugzahlen in den letzten Wochen und Monaten abgenommen haben. Auf unseren Visualisierungen konnte man klar erkennen, dass die Flugzahlen zeitgleich mit dem Anstieg 
der Coronafälle stark gefallen sind. [[Visualisierung]] Zusätzlich haben wir die Flugdaten von diesem Jahr mit den Flugdaten vom letzten Jahr vergleichen, damit wir 
sicherstellen können, dass die Einbrüche der Flugzahlen mit dem Anstieg der Coronafälle zusammen hängen. [[Visualisierung]]

## Prozess
Damit wir auf unserer Website aus Gründen der Perfomanz nur eine Datei laden wollten, haben wir uns dazu entschieden, die Daten in ein JSON zu exportieren. 
Da jedoch viele Daten für uns unbrauchbar waren, mussten wir zunächst die Datensätze bereinigen und haben 
danach die für uns relevanten Daten, sowhohl die des Flugverkehrs, als auch der Corona Daten in ein JSON importiert. \
\
 ![Screenshot vom JSON](./img/JSON_screenshot.png) \
\

# Prototyp / Ergebnisse
## Visualisierung
__Heat Map__ \
Um zu entscheiden, welche Visualisierung sich für unsere Flugdaten eigneten ließen wir uns von <a href="https://datavizproject.com/" target="_blank">datavisprojects</a> inspirieren. Dabei
sind wir auf eine radiale Heat Map gestoßen. \
\
![Alt Text](./img/radialheatMapDatavisprojects.png) \
\
Da sich bei Länder und Monaten um nominale Merkmale und bei der Anzahl der Flieger um ein quantitatives Merkmal handelt, bot sich eine Heat Map an. Zusätzlich 
inspirierten uns die Punkte in den eizelnen Feldern Corona Events anzeigen zu lassen, um den Zusammenhang zwischen dem Einbruch des Flugverkehrs und dem in Kraft treten von 
Kontaktbeschränkungen zu untersuchen. Des Weiteren eignet sich eine radiala Heat Map gut um einzelne Länder und Monate miteinander zu vergleichen. \
Abb. XY zeigt unsere erste Version eines datengestützten Prototypen. \
\
![radiale Heat Map Version 1](./img/radial_prototyp_datengestuetzt.png) \
\
Nach dem ersten datengestützten Prototypen bemerkten wir, dass keine sinnvole Reihenfolge gewählt werden konnte nach der die Länder sortiert werden. Darüber hinaus 
entspricht ein zeitliche Verlauf von rechts nach link — wie es im gesamten linken Teil der Visualisierung passiert — nicht der Erwartung nach zeitlichen Verläufen. \
Deshalb entschieden wir uns eine lineare Heat Map für die Visualisierung der Flugdaten zu wählen. \
Die Farbskala der Heat Map war zu Beginn fließend. Dies änderten wir in eine Farbskala mit 7 Bereichen. Nouancen lassen sich zwar nicht mehr erkennen, aber durch
den gleichen Farbton lassen sich Gemeinsamkeiten beim Vergeleich mehrerer Länder besser erkennen. \
\
![Linendiagramme der Flugdaten und der Coronadaten](./img/liniendiagramme.png) \
\
__Liniendiagramm der Flugdaten__ \
In einem Linendiagramm wollten wir ermöglichen den Flugverkehr eines bestimmten Landes sowohl mit dem inländischen als auch mit dem weltwiten Flugverkehr zu vergleichen. Um einen 
zeitlichen Verlauf mit mehreren quantitativen Daten zu visualisieren bot sich ein Linendiagramm an. Das Auswählen eines bestimmten Landes in der Heat Map sollte eine Detail Ansicht
im Liniendiagramm ermöglichen. Um starke Ausreißer an einzelnen Tagen zu vermeiden, haben wir ein gleitendes Mittel von drei Tagen für die Berechnung der Kurve verwendet. Dies hatte
den Nachteil, dass beipielsweise ein Wochenende im Jahr 2020 mit der Mitte der Woche des Jahres 2019 verglichen wird, was die Ergbnisse verfälscht hätte. Deshalb entschieden
wir uns ein gleitendes Mittel aus sieben Tagen zu verweden und so die Kalender Wochen der beine Jahre miteinander zu vergleichen um den Antieg bzw. Einbruch des Flugverkehrs
zum Vorjahr zu berechnen. \

__Liniendiagramm der Corona Daten__ \
Unter dem Liniendiagramm der Flugdaten visualisierten wir die Corona Daten ebenfalls in einem Liniendiagramm. Durch die äquivalente zeitliche Achse kann so im zeitlichen Verlauf
der Zusammenhang zwischen dem Einbrechen des Flugverkehrs und dem steigen der positiven Corona Fälle beobachtet werden.

## Prototyp
![finales Dashboard](./img/dashboard.png) \
\

## Implementierung
- Implementierung: Wie haben Sie die Visualisierung umgesetzt? Welche Tools haben Sie für welche Schritte eingesetzt? Wieso?

# Erkenntnisse

- Was haben Sie herausgefunden? Können Sie ein/zwei Aussagen oder Stories hervorheben? Nutzen Sie hierzu Abbildungen, die Visualisierungen realer Daten zeigen, sei es aus der EDA-Phase oder mit Hilfe des finalen Prototypens.
- Verknüpfen Sie diese mit Ihren Fragen / Hypothesen.

# Fazit
Reflexion: Haben Sie erreicht, was sie wollten? Ist Ihr Ergebnis hilfreich?
- Ausblick: Welche weiteren Ideen haben Sie? Was könnten interessante nächste Schritte sein?
