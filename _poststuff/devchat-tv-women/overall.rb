require 'gender_detector'
require 'json'

episodes = JSON.parse IO.read('episodes.json')
detector = GenderDetector.new(:case_sensitive => false)

DATA = {
  "Miško Hevery" => :male,
  "Misko Hevery" => :skip,
  "Badrinath Janakiraman" => :male,
  "Postmodern Mod III" => :skip,
  "Gerred Dillon" => :male,
  "TJ VanToll" => :male,
  "Burke Holland" => :male,
  "Vojta Jína" => :male,
  "Ash Furrow" => :male,
  "Pat Shaughnessy" => :male,
  "Hongli Lai" => :male,
  "Tinco Andringa" => :male,
  "Najaf Ali" => :male,
  "Manton Reece" => :male,
  "Pat Flynn" => :male,
  "Mikeal Rogers" => :male,
  "John-David Dalton" => :male,
  "Pippin Williamson" => :male,
  "Jevin Maltais" => :male,
  "Ashe Dryden" => :female,
  "Ariya Hidayat" => :male,
  "Farnoosh Brock" => :female,
  "E. Scott Sweeney, CPA" => :male,
  "Trek Glowacki" => :male,
  "C. J. Hayden" => :female,
  "JT Zemp" => :male,
  "Steven! Ragnarok" => :male,
  "Dr. Nic Williams" => :male,
  "Wynn Netherland" => :male
}

total = 0
total_unique = 0
women = 0
unique_women = 0
episodes_with_women = 0
seen = Hash.new

episodes.each do |episode|

  episode_has_woman = false

  episode['guests'].each do |guest|

    name = guest['name']

    gender = DATA[name]
    next if gender == :skip
    if gender.nil?
      first_name = name.split.first
      gender = detector.get_gender(first_name)
      raise if gender == :andy
    end

    if gender == :female
      women += 1
      unique_women += 1 unless seen[name]
      episode_has_woman = true
    end
    total_unique += 1 unless seen[name]
    total += 1

    seen[name] = true

  end

  episodes_with_women += 1 if episode_has_woman

end

puts "#{women} women, #{unique_women} unique women"
puts "#{total} guests, #{total_unique} unique"
puts "#{episodes_with_women} of #{episodes.length} episodes have a woman"
