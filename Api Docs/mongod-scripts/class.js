db.classes.find({ 
    is_active: true, remaining_slots: { $gt: 1 }
 }