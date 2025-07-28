import 'package:allowance_questboard/core/state/base_id.dart' show BaseId;

abstract class Enumuratable<IdType extends BaseId> {
  IdType get id;
}
