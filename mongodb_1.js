
//  creation des Collections (table)

db.createCollection(

    "students"

)

db.students.insert(
    {
        id: NumberInt(1),
        name: "Véronique",
        ville: "Paris"

    })

db.students.insert(
    {
        id: NumberInt(2),
        name: "Steeven",
        ville: "Lyon"
    })

db.students.insert(
    {
        id: NumberInt(3),
        name: "Marc",
        ville: "Marseille"
    })

db.students.insert(
    {
        id: NumberInt(4),
        name: "Nour",
        ville: "Lyon"
    })

db.students.insert(
    {
        id: NumberInt(5),
        name: "Romain",
        ville: "Paris"
    })

db.students.insert(
    {
        id: NumberInt(6),
        name: "Sophie",
        ville: "Paris"
    })

db.createCollection(

    "languages"

)

db.languages.insert(
    {
        id: NumberInt(1),
        name: "French"
    })

db.languages.insert(
    {
        id: NumberInt(2),
        name: "English"
    })

db.languages.insert(
    {
        id: NumberInt(3),
        name: "German"
    })

db.languages.insert(
    {
        id: NumberInt(4),
        name: "Spanish"
    })

db.languages.insert(
    {
        id: NumberInt(5),
        name: "Mandarin"
    })

db.createCollection(

    "favorites"

)

db.favorites.insert(
    {
        id: NumberInt(1),
        Class: "Maths",
        Sport: "Criket",
        student_id: NumberInt(2)

    })

db.favorites.insert(
    {
        id: NumberInt(2),
        Class: "Music",
        Sport: "Hip-Hop",
        student_id: NumberInt(6)

    })

db.favorites.insert(
    {
        id: NumberInt(3),
        Class: "Arts",
        Sport: "Boxing",
        student_id: NumberInt(1)

    })

db.favorites.insert(
    {
        id: NumberInt(4),
        Class: "Literature",
        Sport: "Tennis",
        student_id: NumberInt(3)

    })

db.favorites.insert(
    {
        id: NumberInt(5),
        Class: "Computer science",
        Sport: "Tennis",
        student_id: NumberInt(5)

    })

db.favorites.insert(
    {
        id: NumberInt(6),
        Class: "Arts",
        Sport: "Baseball",
        student_id: NumberInt(4)

    })

db.createCollection(

    "students_languages"

)

db.students_languages.insert(
    {
        id: NumberInt(1),
        student_id: NumberInt(1),
        language_id: NumberInt(1)
    })

db.students_languages.insert(
    {
        id: NumberInt(2),
        student_id: NumberInt(1),
        language_id: NumberInt(2)
    })

db.students_languages.insert(
    {
        id: NumberInt(3),
        student_id: NumberInt(2),
        language_id: NumberInt(1)
    })

db.students_languages.insert(
    {
        id: NumberInt(4),
        student_id: NumberInt(2),
        language_id: NumberInt(3)
    })

db.students_languages.insert(
    {
        id: NumberInt(5),
        student_id: NumberInt(3),
        language_id: NumberInt(1)
    })

db.students_languages.insert(
    {
        id: NumberInt(6),
        student_id: NumberInt(4),
        language_id: NumberInt(1)
    })

db.students_languages.insert(
    {
        id: NumberInt(7),
        student_id: NumberInt(4),
        language_id: NumberInt(2)
    })

db.students_languages.insert(
    {
        id: NumberInt(8),
        student_id: NumberInt(4),
        language_id: NumberInt(4)
    })

db.students_languages.insert(
    {
        id: NumberInt(9),
        student_id: NumberInt(4),
        language_id: NumberInt(5)
    })

db.students_languages.insert(
    {
        id: NumberInt(10),
        student_id: NumberInt(5),
        language_id: NumberInt(1)
    })

db.students_languages.insert(
    {
        id: NumberInt(11),
        student_id: NumberInt(5),
        language_id: NumberInt(5)
    })

db.students_languages.insert(
    {
        id: NumberInt(12),
        student_id: NumberInt(6),
        language_id: NumberInt(1)
    })

db.students_languages.insert(
    {
        id: NumberInt(13),
        student_id: NumberInt(6),
        language_id: NumberInt(2)
    })

db.students_languages.insert(
    {
        id: NumberInt(14),
        student_id: NumberInt(6),
        language_id: NumberInt(3)
    })


//  Rapport Lvl 1

db.students.find({ id: 3 })

db.students.find({ id: 6 })

db.students.find({ id: 1 })

// db.students.find({ id: 2 },{name:"Véronique", _id:0}) 

db.students.find({ville : "Paris"})

db.students.find({ville : "Lyon"})