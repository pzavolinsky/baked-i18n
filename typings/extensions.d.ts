declare interface ObjectConstructor {
    assign<O1, O2>(o1:O1, o2:O2):O1 & O2;
}
