import 'package:flutter/material.dart';

import '../../../application/member/member_data.dart';
import 'member_list_tile.dart';

class MemberListView extends StatelessWidget {
  const MemberListView({required this.members, required this.onTap, super.key});

  final List<MemberData> members;
  final Function(String memberId) onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.0),
      child: ListView.builder(
        itemCount: members.length,
        itemBuilder: (context, index) {
          final member = members[index];
          return Padding(
              padding: EdgeInsets.only(bottom: 5),
              child: Card(
                clipBehavior: Clip.antiAlias,
                child: InkWell(
                  onTap: () => onTap(member.id),
                  child: Padding(
                    padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
                    child: Column(
                      children: [
                        MemberListTile(
                          member: member,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Text('ランク:${member.exp}', textAlign: TextAlign.right),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Text('今月の報酬:${member.balance}', textAlign: TextAlign.right),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ));
        },
      ),
    );
  }
}
