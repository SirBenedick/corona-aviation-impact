require 'json'
require 'date'

data_flights = File.open('../flights.json')
flights = JSON.load data_flights

File.open("./covid.csv", 'r+') do |file|
  file.each_line do |line, index|
    line_array = line.split(',')
    country_code = line_array[7]
    year = line_array[3]
    month = line_array[2]
    day = line_array[1]
    cases = line_array[4]
    deaths = line_array[5]

    time_stamp = DateTime.new(year=year.to_i, month=month.to_i, day=day.to_i, hour=0, minute=0, second=0, millisecond=0).to_time.to_i

    unless flights[country_code].nil? #wenn der CountryCode im flights Datensatz vorhanden ist
      new_corona_cases = Hash.new
      new_corona_cases["Cases"] = cases
      new_corona_cases["Deaths"] = deaths
      unless flights[country_code]["dates"][time_stamp.to_s].nil? #wenn der timestamp auch vorhanden ist
        flights[country_code]["dates"][time_stamp.to_s]["coronaCases"] = new_corona_cases
      end
    end
  end
end

result = File.new('covidIntoFightsResult.json', 'w')
result.write(flights.to_json)

result.close
data_flights.close








